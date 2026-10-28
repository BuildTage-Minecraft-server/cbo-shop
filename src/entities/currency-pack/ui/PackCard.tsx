import type { ReactNode } from "react";
import { cn, formatNumber, formatRub } from "@/shared/lib";
import { packDiscountPercent, packUnitPrice } from "../model/packs";
import type { CurrencyPack } from "../model/types";
import { CurrencyIcon } from "./CurrencyIcon";

export function PackCard({ pack, action }: { pack: CurrencyPack; action: ReactNode }) {
  const discount = packDiscountPercent(pack);

  return (
    <article
      className={cn(
        "relative flex flex-col rounded-xl border bg-surface/80 p-6 backdrop-blur",
        pack.featured
          ? "border-neon-pink shadow-[0_0_48px_-18px_var(--color-neon-pink)]"
          : "border-line hover:border-line-strong",
      )}
    >
      {pack.featured ? (
        <span className="absolute -top-3 left-6 rounded bg-neon-pink px-2 py-1 font-pixel text-[9px] uppercase text-ink">
          Популярный
        </span>
      ) : null}

      <CurrencyIcon className="h-12 w-12" />
      <p className="mt-4 font-pixel text-2xl text-gold">{formatNumber(pack.amount)}</p>
      <p className="mt-1 text-sm text-muted">Обрыгаций</p>

      <p className="mt-6 text-3xl font-bold text-fg">{formatRub(pack.priceRub)}</p>
      <p className="mt-1 text-xs text-muted">
        {packUnitPrice(pack)} за 1 Обрыгацию{discount > 0 ? `, выгода ${discount}%` : ""}
      </p>

      <div className="mt-6">{action}</div>
    </article>
  );
}
