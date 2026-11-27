function fromEnv(name: string): string | null {
  const value = process.env[name]?.trim();
  return value ? value : null;
}

function boundedInt(name: string, fallback: number, min: number, max: number): number {
  const raw = fromEnv(name);
  if (raw === null) return fallback;

  const value = Number(raw);
  if (!Number.isInteger(value) || value < min || value > max) return fallback;
  return value;
}

export const partnerProgram = {
  enabled: fromEnv("DATABASE_URL") !== null,
  commissionPercent: boundedInt("PARTNER_COMMISSION_PERCENT", 10, 1, 50),
  holdDays: boundedInt("PARTNER_HOLD_DAYS", 0, 0, 90),
  minPayoutRub: boundedInt("PARTNER_MIN_PAYOUT_RUB", 500, 1, 100000),
  attributionDays: 30,
};
