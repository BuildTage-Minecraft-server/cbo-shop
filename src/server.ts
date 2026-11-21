import express, { NextFunction, Request, Response } from "express";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { adb, hasRoot, isDeviceReady } from "./adb.js";
import { config } from "./config.js";
import { deleteApp, installApp, saveApp, saveAppFromUrl } from "./apps.js";
import { activate, disconnect } from "./happ.js";
import { installEverywhere, prepareProfiles, saveApk } from "./install.js";
import { startWatchdog } from "./watchdog.js";
import { installBootSync, readSsaid } from "./ssaid.js";
import { addServer, getStore, removeServer } from "./store.js";
import {
  createUser,
  listUsers,
  removeUser,
  startUser,
  stopUser,
  switchUser,
} from "./users.js";

const app = express();
app.use(express.json());

let busy = false;

function auth(req: Request, res: Response, next: NextFunction): void {
  if (!config.adminToken) {
    next();
    return;
  }
  const header = req.header("authorization") ?? "";
  if (header === `Bearer ${config.adminToken}`) {
    next();
    return;
  }
  res.status(401).json({ error: "Unauthorized" });
}

type Handler = (req: Request, res: Response) => Promise<unknown>;

function route(handler: Handler, exclusive = false) {
  return async (req: Request, res: Response) => {
    if (exclusive) {
      if (busy) {
        res.status(409).json({ error: "Another operation is in progress" });
        return;
      }
      busy = true;
    }
    try {
      const result = await handler(req, res);
      if (!res.headersSent) res.json(result ?? { ok: true });
    } catch (error) {
      if (!res.headersSent) res.status(500).json({ error: (error as Error).message });
    } finally {
      if (exclusive) busy = false;
    }
  };
}

function userId(req: Request): number {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id < 0) throw new Error("Invalid profile id");
  return id;
}

async function requireRoot(): Promise<void> {
  if (!(await hasRoot())) throw new Error("Root access is required for this feature");
}

app.use("/api", auth);

app.get(
  "/api/status",
  route(async () => {
    const connected = await isDeviceReady();
    if (!connected) return { connected, root: false, users: [], servers: [], apps: [], active: {}, busy };
    const [users, store, root] = await Promise.all([listUsers(), getStore(), hasRoot()]);
    return { connected, root, users, servers: store.servers, apps: store.apps, active: store.active, busy };
  }),
);

app.post(
  "/api/users",
  route(async (req) => ({ id: await createUser(String(req.body?.name ?? "")) }), true),
);
app.delete(
  "/api/users/:id",
  route(async (req) => removeUser(userId(req)), true),
);
app.post(
  "/api/users/:id/switch",
  route(async (req) => switchUser(userId(req)), true),
);
app.post(
  "/api/users/:id/start",
  route(async (req) => startUser(userId(req)), true),
);
app.post(
  "/api/users/:id/stop",
  route(async (req) => stopUser(userId(req)), true),
);

app.post(
  "/api/servers",
  route(async (req) => {
    const name = String(req.body?.name ?? "").trim();
    const link = String(req.body?.link ?? "").trim();
    if (!link) throw new Error("Link is required");
    return addServer(name, link);
  }),
);
app.delete(
  "/api/servers/:id",
  route(async (req) => removeServer(String(req.params.id))),
);

app.post(
  "/api/users/:id/activate",
  route(async (req) => {
    const id = userId(req);
    const store = await getStore();
    const server = store.servers.find((item) => item.id === req.body?.serverId);
    if (!server) throw new Error("Server not found");
    return { steps: await activate(id, server) };
  }, true),
);
app.post(
  "/api/users/:id/disconnect",
  route(async (req) => ({ steps: await disconnect(userId(req)) }), true),
);

app.get(
  "/api/identity",
  route(async () => {
    await requireRoot();
    const users = await listUsers();
    const rows = [];
    for (const user of users) {
      try {
        const entry = await readSsaid(user.id, config.happPackage);
        rows.push({ id: user.id, name: user.name, value: entry?.value ?? null });
      } catch (error) {
        rows.push({ id: user.id, name: user.name, value: null, error: (error as Error).message });
      }
    }
    return { package: config.happPackage, rows };
  }),
);
app.post(
  "/api/identity/sync",
  route(async (req) => {
    await requireRoot();
    const source = Number(req.body?.sourceUserId);
    if (!Number.isInteger(source) || source < 0) throw new Error("Invalid source profile");
    const entry = await readSsaid(source, config.happPackage);
    if (!entry) throw new Error("Source profile has no stored ID for Happ. Launch Happ there once");
    const targets = (await listUsers()).map((user) => user.id).filter((id) => id !== source);
    const steps = await prepareProfiles(targets);
    await installBootSync(config.happPackage, entry.value);
    steps.push({ name: "Install the boot-time ID sync module", ok: true });
    const synced = targets;
    return { steps, synced, rebootRequired: synced.length > 0 };
  }, true),
);

app.post(
  "/api/happ/apk",
  express.raw({ type: "application/octet-stream", limit: "500mb" }),
  route(async (req) => {
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) throw new Error("Empty file");
    await saveApk(req.body);
    return { size: req.body.length };
  }),
);
app.post(
  "/api/apps",
  express.raw({ type: "application/octet-stream", limit: "1gb" }),
  route(async (req) => {
    if (!Buffer.isBuffer(req.body) || req.body.length === 0) throw new Error("Empty file");
    return saveApp(String(req.query.label ?? ""), req.body);
  }),
);
app.post(
  "/api/apps/url",
  route(async (req) => saveAppFromUrl(String(req.body?.label ?? ""), String(req.body?.url ?? ""))),
);
app.post(
  "/api/apps/:id/install",
  route(async (req) => {
    const users = Array.isArray(req.body?.users) ? req.body.users.map(Number) : null;
    return { steps: await installApp(String(req.params.id), users) };
  }, true),
);
app.delete(
  "/api/apps/:id",
  route(async (req) => deleteApp(String(req.params.id))),
);

app.post(
  "/api/happ/install",
  route(async () => ({ steps: await installEverywhere() }), true),
);

app.post(
  "/api/reboot",
  route(async () => {
    await adb(["reboot"]);
  }, true),
);

const here = dirname(fileURLToPath(import.meta.url));
app.use(express.static(join(here, "..", "public")));

app.listen(config.port, () => {
  console.log(`droid-profile-hub listening on :${config.port}`);
  startWatchdog();
});
