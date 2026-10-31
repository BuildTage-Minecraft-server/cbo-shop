import "server-only";
import { cookies } from "next/headers";

const COOKIE_NAME = "cbo_last_payment";
const MAX_AGE_SECONDS = 60 * 60 * 24;

export async function rememberPayment(paymentId: string): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, paymentId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE_SECONDS,
  });
}

export async function recallPayment(): Promise<string | null> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value ?? null;
}
