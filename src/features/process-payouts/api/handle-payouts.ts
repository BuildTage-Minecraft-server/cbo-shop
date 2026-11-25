import "server-only";
import { createHash, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { listPendingPayouts, resolvePayout } from "@/entities/partner";
import { partnerProgram } from "@/shared/config";
import { serverEnv } from "@/shared/config/env";

const resolveSchema = z.object({
  id: z.number().int().positive(),
  status: z.enum(["paid", "rejected"]),
});

function digest(value: string): Buffer {
  return createHash("sha256").update(value).digest();
}

function reply(status: number, body: Record<string, unknown>): Response {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function check(request: Request): Response | null {
  const token = serverEnv().PARTNER_ADMIN_TOKEN;
  if (!partnerProgram.enabled || !token) {
    return reply(404, { code: "disabled" });
  }

  const header = request.headers.get("authorization") ?? "";
  const given = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!timingSafeEqual(digest(given), digest(token))) {
    return reply(401, { code: "unauthorized" });
  }

  return null;
}

export async function handlePayoutList(request: Request): Promise<Response> {
  const denied = check(request);
  if (denied) return denied;

  try {
    const payouts = await listPendingPayouts();
    return reply(200, {
      payouts: payouts.map((item) => ({
        id: item.id,
        partner: item.partnerCode,
        player: item.playerName,
        amountRub: (item.amountKopecks / 100).toFixed(2),
        details: item.details,
        createdAt: item.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Failed to list payouts", error);
    return reply(502, { code: "unavailable" });
  }
}

export async function handlePayoutResolve(request: Request): Promise<Response> {
  const denied = check(request);
  if (denied) return denied;

  const body: unknown = await request.json().catch(() => null);
  const parsed = resolveSchema.safeParse(body);
  if (!parsed.success) {
    return reply(400, { code: "rejected" });
  }

  try {
    const changed = await resolvePayout(parsed.data.id, parsed.data.status);
    return changed ? reply(200, { code: "ok" }) : reply(404, { code: "notPending" });
  } catch (error) {
    console.error("Failed to resolve a payout", error);
    return reply(502, { code: "unavailable" });
  }
}
