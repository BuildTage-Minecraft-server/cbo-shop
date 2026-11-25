import "server-only";
import { db } from "@/shared/api/database";
import { partnerProgram } from "@/shared/config";

export type RecordCommissionInput = {
  paymentId: string;
  playerUuid: string;
  paidKopecks: number;
};

export async function recordCommission(input: RecordCommissionInput): Promise<void> {
  if (!partnerProgram.enabled) return;

  await db.query(
    `insert into commissions (payment_id, partner_id, player_uuid, payment_kopecks, amount_kopecks, available_at)
     select $1::text, p.id, r.player_uuid, $3::int, ($3::bigint * p.rate_bps / 10000)::int,
            now() + make_interval(days => $4::int)
     from referrals r
     join partners p on p.id = r.partner_id
     where r.player_uuid = $2::text
     on conflict (payment_id) do nothing`,
    [input.paymentId, input.playerUuid, input.paidKopecks, partnerProgram.holdDays],
  );
}
