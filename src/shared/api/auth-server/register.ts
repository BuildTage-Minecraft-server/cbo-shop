import "server-only";
import { serverEnv } from "@/shared/config/env";
import { classifyRegisterFailure } from "./classify-error";
import type { RegisterFailure } from "./classify-error";

export type AccountRegisterErrorKind = RegisterFailure | "disabled" | "unavailable";

export class AccountRegisterError extends Error {
  readonly kind: AccountRegisterErrorKind;

  constructor(kind: AccountRegisterErrorKind, message: string) {
    super(message);
    this.name = "AccountRegisterError";
    this.kind = kind;
  }
}

const API_VERSIONS = ["v3"] as const;

async function readMessage(response: Response): Promise<string> {
  try {
    const data: unknown = await response.json();
    if (data && typeof data === "object" && "message" in data) {
      const { message } = data as { message: unknown };
      return typeof message === "string" ? message : "";
    }
  } catch {
    return "";
  }
  return "";
}

export async function registerAccount(username: string, password: string): Promise<void> {
  const env = serverEnv();
  const token = env.DRASL_ADMIN_TOKEN;
  if (!token) {
    throw new AccountRegisterError("disabled", "Registration through the auth server API is not configured");
  }

  const baseUrl = env.DRASL_URL.replace(/\/+$/, "");

  for (const version of API_VERSIONS) {
    let response: Response;
    try {
      response = await fetch(`${baseUrl}/drasl/api/${version}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ username, password, playerName: username, isAdmin: false, isLocked: false }),
        cache: "no-store",
        signal: AbortSignal.timeout(10000),
      });
    } catch {
      throw new AccountRegisterError("unavailable", "Auth server is unreachable");
    }

    if (response.status === 404) continue;
    if (response.ok) return;

    const message = await readMessage(response);
    const details = `Auth server responded with ${response.status}: ${message}`;
    if (response.status >= 500) throw new AccountRegisterError("unavailable", details);
    throw new AccountRegisterError(classifyRegisterFailure(response.status, message), details);
  }

  throw new AccountRegisterError("unavailable", "Auth server API endpoint was not found");
}
