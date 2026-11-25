import "server-only";
import { cookies } from "next/headers";
import { db } from "@/shared/api/database";
import { partnerProgram } from "@/shared/config";
import { isValidCode, normalizeCode } from "../lib/code";
import { REFERRAL_COOKIE } from "./referral-cookie";

export async function attributeReferral(playerUuid: string): Promise<void> {
  if (!partnerProgram.enabled) return;

  try {
    const store = await cookies();
    const raw = store.get(REFERRAL_COOKIE)?.value;
    if (!raw) return;

    const code = normalizeCode(raw);
    if (isValidCode(code)) {
      await db.query(
        `insert into referrals (player_uuid, partner_id)
         select $1::text, p.id from partners p
         where p.code = $2::text and p.player_uuid <> $1::text
         on conflict (player_uuid) do nothing`,
        [playerUuid, code],
      );
    }

    store.delete(REFERRAL_COOKIE);
  } catch (error) {
    console.error("Referral attribution failed", error);
  }
}
