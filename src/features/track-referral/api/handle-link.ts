import "server-only";
import { NextResponse } from "next/server";
import { isValidCode, normalizeCode, partnerCodeExists, REFERRAL_COOKIE, referralCookieOptions } from "@/entities/partner";
import { partnerProgram, routes } from "@/shared/config";
import { siteUrl } from "@/shared/config/site-url";

export async function handleReferralLink(rawCode: string): Promise<Response> {
  const response = NextResponse.redirect(new URL(routes.home, siteUrl()), 302);
  response.headers.set("Cache-Control", "no-store");

  const code = normalizeCode(rawCode);
  if (!partnerProgram.enabled || !isValidCode(code)) return response;

  try {
    if (await partnerCodeExists(code)) {
      response.cookies.set(REFERRAL_COOKIE, code, referralCookieOptions);
    }
  } catch (error) {
    console.error("Referral link lookup failed", error);
  }

  return response;
}
