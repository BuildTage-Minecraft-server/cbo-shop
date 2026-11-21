import "server-only";
import { serverEnv } from "@/shared/config/env";
import { toDashedUuid } from "@/shared/lib";

export type AccountPlayer = {
  uuid: string;
  name: string;
};

export type AuthErrorKind = "invalid-credentials" | "rate-limited" | "unavailable";

export class AuthError extends Error {
  readonly kind: AuthErrorKind;

  constructor(kind: AuthErrorKind, message: string) {
    super(message);
    this.name = "AuthError";
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
    throw new AuthError("unavailable", "Auth server is unreachable");
  }
}

function pickProfile(data: AuthenticateResponse, username: string): Profile | undefined {
  if (data.selectedProfile) return data.selectedProfile;

  const profiles = data.availableProfiles ?? [];
  const needle = username.toLowerCase();
  return profiles.find((profile) => profile.name.toLowerCase() === needle) ?? profiles[0];
}

export async function authenticateAccount(username: string, password: string): Promise<AccountPlayer> {
  const response = await post("/authenticate", {
    agent: { name: "Minecraft", version: 1 },
    username,
    password,
    requestUser: false,
  });

  if (response.status === 401 || response.status === 403) {
    throw new AuthError("invalid-credentials", "Invalid credentials");
  }
  if (response.status === 429) {
    throw new AuthError("rate-limited", "Too many attempts");
  }
  if (!response.ok) {
    throw new AuthError("unavailable", `Auth server responded with ${response.status}`);
  }

  const data = (await response.json()) as AuthenticateResponse;
  const profile = pickProfile(data, username);
  if (!profile) {
    throw new AuthError("invalid-credentials", "Account has no player profile");
  }

  const uuid = toDashedUuid(profile.id);
  if (!uuid) {
    throw new AuthError("unavailable", "Unexpected profile id");
  }

  await post("/invalidate", { accessToken: data.accessToken, clientToken: data.clientToken }).catch(() => undefined);

  return { uuid, name: profile.name };
}
