import "server-only";
import type { Db } from "@/shared/api/database";

export type Balance = {
  earned: number;
  matured: number;
  paid: number;
  pending: number;
};

export async function readBalance(conn: Db, partnerId: number): Promise<Balance> {
  const { rows } = await conn.query<Balance>(
    `select
       coalesce((select sum(amount_kopecks) from commissions where partner_id = $1), 0)::int as earned,
       coalesce((select sum(amount_kopecks) from commissions where partner_id = $1 and available_at <= now()), 0)::int as matured,
       coalesce((select sum(amount_kopecks) from payouts where partner_id = $1 and status = 'paid'), 0)::int as paid,
       coalesce((select sum(amount_kopecks) from payouts where partner_id = $1 and status = 'pending'), 0)::int as pending`,
    [partnerId],
  );
  return rows[0];
}

export function availableOf(balance: Balance): number {
  return Math.max(0, balance.matured - balance.paid - balance.pending);
}
