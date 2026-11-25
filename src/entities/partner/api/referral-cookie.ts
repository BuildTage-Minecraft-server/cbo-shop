import "server-only";
import { partnerProgram } from "@/shared/config";

export const REFERRAL_COOKIE = "cbo_ref";

export const referralCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
  maxAge: 60 * 60 * 24 * partnerProgram.attributionDays,
} as const;
