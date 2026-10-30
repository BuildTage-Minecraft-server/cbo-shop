import { formatRubPrecise } from "@/shared/lib";
import type { CurrencyPack } from "./types";

const BASE_RATE_RUB = 1;

export const CURRENCY_PACKS: readonly CurrencyPack[] = [
  { id: "pack-100", amount: 100, priceRub: 100 },
  { id: "pack-300", amount: 300, priceRub: 290 },
  { id: "pack-500", amount: 500, priceRub: 475 },
  { id: "pack-1000", amount: 1000, priceRub: 900, featured: true },
  { id: "pack-2500", amount: 2500, priceRub: 2125 },
  { id: "pack-5000", amount: 5000, priceRub: 4000 },
];

export function findPack(id: unknown): CurrencyPack | undefined {
  if (typeof id !== "string") return undefined;
  return CURRENCY_PACKS.find((pack) => pack.id === id);
}

export function packDiscountPercent(pack: CurrencyPack): number {
  return Math.max(0, Math.round((1 - pack.priceRub / (pack.amount * BASE_RATE_RUB)) * 100));
}

export function packUnitPrice(pack: CurrencyPack): string {
  return formatRubPrecise(pack.priceRub / pack.amount);
}
