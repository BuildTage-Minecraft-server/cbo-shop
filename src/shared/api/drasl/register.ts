import "server-only";
import { serverEnv } from "@/shared/config/env";
import { classifyRegisterFailure } from "./classify-error";
import type { RegisterFailure } from "./classify-error";

export type DraslRegisterErrorKind = RegisterFailure | "disabled" | "unavailable";

export class DraslRegisterError extends Error {
  readonly kind: DraslRegisterErrorKind;

  constructor(kind: DraslRegisterErrorKind, message: string) {
    super(message);
    this.name = "DraslRegisterError";
    this.kind = kind;
  }
}

const API_VERSIONS = ["v2", "v1"] as const;

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

export async function registerInDrasl(username: string, password: string): Promise<void> {
  const env = serverEnv();
  const token = env.DRASL_ADMIN_TOKEN;
  if (!token) {
    throw new DraslRegisterError("disabled", "Registration through the Drasl API is not configured");
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
      throw new DraslRegisterError("unavailable", "Drasl is unreachable");
    }

    if (response.status === 404) continue;
    if (response.ok) return;

    const message = await readMessage(response);
    const details = `Drasl responded with ${response.status}: ${message}`;
    if (response.status >= 500) throw new DraslRegisterError("unavailable", details);
    throw new DraslRegisterError(classifyRegisterFailure(response.status, message), details);
  }

  throw new DraslRegisterError("unavailable", "Drasl API endpoint was not found");
}
