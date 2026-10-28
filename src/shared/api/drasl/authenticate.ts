import "server-only";
import { serverEnv } from "@/shared/config/env";
import { toDashedUuid } from "@/shared/lib";

export type DraslPlayer = {
  uuid: string;
  name: string;
};

export type DraslAuthErrorKind = "invalid-credentials" | "rate-limited" | "unavailable";

export class DraslAuthError extends Error {
  readonly kind: DraslAuthErrorKind;

  constructor(kind: DraslAuthErrorKind, message: string) {
    super(message);
    this.name = "DraslAuthError";
    this.kind = kind;
  }
}

type Profile = { id: string; name: string };

type AuthenticateResponse = {
  accessToken: string;
  clientToken?: string;
  selectedProfile?: Profile;
  availableProfiles?: Profile[];
};

function authServerUrl(): string {
  return `${serverEnv().DRASL_URL.replace(/\/+$/, "")}/authlib-injector/authserver`;
}

async function post(path: string, body: unknown): Promise<Response> {
  try {
    return await fetch(`${authServerUrl()}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
      signal: AbortSignal.timeout(8000),
    });
  } catch {
    throw new DraslAuthError("unavailable", "Drasl is unreachable");
  }
}

function pickProfile(data: AuthenticateResponse, username: string): Profile | undefined {
  if (data.selectedProfile) return data.selectedProfile;

  const profiles = data.availableProfiles ?? [];
  const needle = username.toLowerCase();
  return profiles.find((profile) => profile.name.toLowerCase() === needle) ?? profiles[0];
}

export async function authenticateWithDrasl(username: string, password: string): Promise<DraslPlayer> {
  const response = await post("/authenticate", {
    agent: { name: "Minecraft", version: 1 },
    username,
    password,
    requestUser: false,
  });

  if (response.status === 401 || response.status === 403) {
    throw new DraslAuthError("invalid-credentials", "Invalid credentials");
  }
  if (response.status === 429) {
    throw new DraslAuthError("rate-limited", "Too many attempts");
  }
  if (!response.ok) {
    throw new DraslAuthError("unavailable", `Drasl responded with ${response.status}`);
  }

  const data = (await response.json()) as AuthenticateResponse;
  const profile = pickProfile(data, username);
  if (!profile) {
    throw new DraslAuthError("invalid-credentials", "Account has no player profile");
  }

  const uuid = toDashedUuid(profile.id);
  if (!uuid) {
    throw new DraslAuthError("unavailable", "Unexpected profile id");
  }

  await post("/invalidate", { accessToken: data.accessToken, clientToken: data.clientToken }).catch(() => undefined);

  return { uuid, name: profile.name };
}
