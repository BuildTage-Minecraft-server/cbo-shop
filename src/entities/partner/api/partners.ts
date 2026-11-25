import "server-only";
import { db, isUniqueViolation } from "@/shared/api/database";
import type { Partner } from "../model/types";

type PartnerRow = {
  id: number;
  player_uuid: string;
  player_name: string;
  code: string;
  rate_bps: number;
};

const COLUMNS = "id, player_uuid, player_name, code, rate_bps";

function toPartner(row: PartnerRow): Partner {
  return {
    id: row.id,
    playerUuid: row.player_uuid,
    playerName: row.player_name,
    code: row.code,
    rateBps: row.rate_bps,
  };
}

export type CreatePartnerInput = {
  playerUuid: string;
  playerName: string;
  code: string;
  rateBps: number;
};

export type CreatePartnerResult =
  | { kind: "created"; partner: Partner }
  | { kind: "already-partner" }
  | { kind: "code-taken" };

export async function findPartnerByPlayer(playerUuid: string): Promise<Partner | null> {
  const { rows } = await db.query<PartnerRow>(`select ${COLUMNS} from partners where player_uuid = $1`, [playerUuid]);
  return rows[0] ? toPartner(rows[0]) : null;
}

export async function partnerCodeExists(code: string): Promise<boolean> {
  const { rowCount } = await db.query("select 1 from partners where code = $1", [code]);
  return (rowCount ?? 0) > 0;
}

export async function createPartner(input: CreatePartnerInput): Promise<CreatePartnerResult> {
  try {
    const { rows } = await db.query<PartnerRow>(
      `insert into partners (player_uuid, player_name, code, rate_bps)
       values ($1, $2, $3, $4)
       on conflict (player_uuid) do nothing
       returning ${COLUMNS}`,
      [input.playerUuid, input.playerName, input.code, input.rateBps],
    );
    return rows[0] ? { kind: "created", partner: toPartner(rows[0]) } : { kind: "already-partner" };
  } catch (error) {
    if (isUniqueViolation(error)) return { kind: "code-taken" };
    throw error;
  }
}
