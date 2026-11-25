import "server-only";
import { db, withTransaction } from "@/shared/api/database";
import type { PendingPayout } from "../model/types";
import { availableOf, readBalance } from "./balance";

export type PayoutRequestResult =
  | { kind: "created"; amountKopecks: number }
  | { kind: "too-small"; availableKopecks: number }
  | { kind: "already-pending" };

export function requestPayout(partnerId: number, details: string, minKopecks: number): Promise<PayoutRequestResult> {
  return withTransaction(async (tx): Promise<PayoutRequestResult> => {
    await tx.query("select id from partners where id = $1 for update", [partnerId]);

    const balance = await readBalance(tx, partnerId);
    if (balance.pending > 0) return { kind: "already-pending" };

    const available = availableOf(balance);
    if (available < minKopecks) return { kind: "too-small", availableKopecks: available };

    await tx.query("insert into payouts (partner_id, amount_kopecks, details) values ($1, $2, $3)", [
      partnerId,
      available,
      details,
    ]);
    return { kind: "created", amountKopecks: available };
  });
}

type PendingRow = {
  id: number;
  code: string;
  player_name: string;
  amount_kopecks: number;
  details: string;
  created_at: Date;
};

export async function listPendingPayouts(): Promise<PendingPayout[]> {
  const { rows } = await db.query<PendingRow>(
    `select y.id, p.code, p.player_name, y.amount_kopecks, y.details, y.created_at
     from payouts y
     join partners p on p.id = y.partner_id
     where y.status = 'pending'
     order by y.created_at`,
  );
  return rows.map((row) => ({
    id: row.id,
    partnerCode: row.code,
    playerName: row.player_name,
    amountKopecks: row.amount_kopecks,
    details: row.details,
    createdAt: row.created_at,
  }));
}

export async function resolvePayout(id: number, status: "paid" | "rejected"): Promise<boolean> {
  const { rowCount } = await db.query(
    "update payouts set status = $2::text, processed_at = now() where id = $1 and status = 'pending'",
    [id, status],
  );
  return (rowCount ?? 0) > 0;
}
