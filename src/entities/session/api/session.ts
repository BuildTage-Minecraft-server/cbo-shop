import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { serverEnv } from "@/shared/config/env";
import { toDashedUuid } from "@/shared/lib";
import type { Session } from "../model/types";

const COOKIE_NAME = "obr_session";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 7;

function secretKey(): Uint8Array {
  return new TextEncoder().encode(serverEnv().SESSION_SECRET);
}

export async function createSession(session: Session): Promise<void> {
  const token = await new SignJWT({ name: session.name })
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(session.uuid)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());

  const store = await cookies();
  store.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey(), { algorithms: ["HS256"] });
    const uuid = payload.sub ? toDashedUuid(payload.sub) : null;
    const name = typeof payload.name === "string" ? payload.name : null;
    if (!uuid || !name) return null;

    return { uuid, name };
  } catch {
    return null;
  }
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
