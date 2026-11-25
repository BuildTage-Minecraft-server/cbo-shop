import "server-only";
import { db } from "@/shared/api/database";
import type { CommissionRecord, Partner, PartnerDashboard, PayoutRecord, PayoutStatus } from "../model/types";
import { availableOf, readBalance } from "./balance";

type CommissionRow = { amount_kopecks: number; created_at: Date; available_at: Date };
type PayoutRow = { id: number; amount_kopecks: number; status: PayoutStatus; created_at: Date };

export async function getPartnerDashboard(partner: Partner): Promise<PartnerDashboard> {
  const [balance, counts, commissions, payouts] = await Promise.all([
    readBalance(db, partner.id),
    db.query<{ referrals: number; buyers: number }>(
      `select
         (select count(*) from referrals where partner_id = $1)::int as referrals,
         (select count(distinct player_uuid) from commissions where partner_id = $1)::int as buyers`,
      [partner.id],
    ),
    db.query<CommissionRow>(
      "select amount_kopecks, created_at, available_at from commissions where partner_id = $1 order by created_at desc limit 10",
      [partner.id],
    ),
    db.query<PayoutRow>(
      "select id, amount_kopecks, status, created_at from payouts where partner_id = $1 order by created_at desc limit 10",
      [partner.id],
    ),
  ]);

  return {
    referrals: counts.rows[0].referrals,
    buyers: counts.rows[0].buyers,
    earnedKopecks: balance.earned,
    holdKopecks: Math.max(0, balance.earned - balance.matured),
    availableKopecks: availableOf(balance),
    pendingKopecks: balance.pending,
    paidKopecks: balance.paid,
    commissions: commissions.rows.map(
      (row): CommissionRecord => ({
        amountKopecks: row.amount_kopecks,
        createdAt: row.created_at,
        availableAt: row.available_at,
      }),
    ),
    payouts: payouts.rows.map(
      (row): PayoutRecord => ({
        id: row.id,
        amountKopecks: row.amount_kopecks,
        status: row.status,
        createdAt: row.created_at,
      }),
    ),
  };
}
