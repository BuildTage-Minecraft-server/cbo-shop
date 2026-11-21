import { createWriteStream } from "node:fs";
import { mkdir, open, rm, writeFile } from "node:fs/promises";
import { Readable, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { join } from "node:path";
import { adb, su, waitForDevice } from "./adb.js";
import { config } from "./config.js";
import type { Step } from "./happ.js";
import { listThirdParty, parsePackageList } from "./install.js";
import { addApp, getApp, removeApp, setAppPackage } from "./store.js";
import type { AppEntry } from "./store.js";
import { listUsers } from "./users.js";

const appsDir = () => join(config.dataDir, "apps");

export function cleanLabel(raw: string): string {
  const label = raw.replace(/[\u0000-\u001f]/g, "").trim().slice(0, 60);
  if (!label) throw new Error("Give the app a name");
  return label;
}

const MAX_APK_BYTES = 1024 * 1024 * 1024;

export function looksLikeApk(head: Buffer): boolean {
  return head.length >= 4 && head[0] === 0x50 && head[1] === 0x4b && head[2] === 0x03 && head[3] === 0x04;
}

export async function saveApp(label: string, data: Buffer): Promise<AppEntry> {
  if (!looksLikeApk(data.subarray(0, 4))) throw new Error("The file is not an APK");
  await mkdir(appsDir(), { recursive: true });
  const name = cleanLabel(label);
  const entry = await addApp(name);
  await writeFile(join(appsDir(), entry.file), data);
  return entry;
}

export async function saveAppFromUrl(label: string, url: string): Promise<AppEntry> {
  const name = cleanLabel(label);
  let target: URL;
  try {
    target = new URL(url.trim());
  } catch {
    throw new Error("Invalid URL");
  }
  if (target.protocol !== "https:") throw new Error("Only https links are allowed");
  const response = await fetch(target, { redirect: "follow" });
  if (!response.ok || !response.body) throw new Error(`Download failed (${response.status})`);
  const declared = Number(response.headers.get("content-length") ?? 0);
  if (declared > MAX_APK_BYTES) throw new Error("The file is too large");

  await mkdir(appsDir(), { recursive: true });
  const entry = await addApp(name);
  const path = join(appsDir(), entry.file);
  let received = 0;
  const limit = new Transform({
    transform(chunk: Buffer, _encoding, callback) {
      received += chunk.length;
      if (received > MAX_APK_BYTES) callback(new Error("The file is too large"));
      else callback(null, chunk);
    },
  });
  try {
    await pipeline(Readable.fromWeb(response.body as Parameters<typeof Readable.fromWeb>[0]), limit, createWriteStream(path));
    const handle = await open(path, "r");
    const head = Buffer.alloc(4);
    await handle.read(head, 0, 4, 0);
    await handle.close();
    if (!looksLikeApk(head)) throw new Error("The link did not return an APK file");
  } catch (error) {
    await deleteApp(entry.id);
    throw error;
  }
  return entry;
}

export async function deleteApp(id: string): Promise<void> {
  const entry = await removeApp(id);
  if (entry) await rm(join(appsDir(), entry.file), { force: true });
}

async function installedFor(userId: number, pkg: string): Promise<boolean> {
  return parsePackageList(await su(`pm list packages --user ${userId} ${pkg}`), pkg);
}

export async function installApp(id: string, requested: number[] | null): Promise<Step[]> {
  const entry = await getApp(id);
  if (!entry) throw new Error("App not found");
  const steps: Step[] = [];
  let pkg = entry.package;

  if (!pkg || !(await installedFor(0, pkg))) {
    const before = await listThirdParty();
    await adb(["install", "-r", "--user", "0", join(appsDir(), entry.file)], 1500000);
    if (!pkg) {
      const after = await listThirdParty();
      const added = [...after].filter((name) => !before.has(name));
      if (added.length !== 1) throw new Error("Could not detect the package name of this APK");
      pkg = added[0];
      await setAppPackage(entry.id, pkg);
    }
    steps.push({ name: `Install ${entry.label} in the owner profile`, ok: true });
  }

  const users = (await listUsers())
    .map((user) => user.id)
    .filter((userId) => userId !== 0 && (!requested || requested.includes(userId)));

  for (const userId of users) {
    try {
      await waitForDevice();
      if (!(await installedFor(userId, pkg))) {
        await su(`pm install-existing --user ${userId} ${pkg}`);
        steps.push({ name: `Add ${entry.label} to profile ${userId}`, ok: true });
      }
    } catch (error) {
      steps.push({ name: `Add ${entry.label} to profile ${userId}`, ok: false, detail: (error as Error).message });
    }
  }

  if (steps.length === 0) steps.push({ name: `${entry.label} is already installed everywhere`, ok: true });
  return steps;
}
