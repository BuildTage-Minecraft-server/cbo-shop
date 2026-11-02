import type { ReactNode } from "react";
import { formatNumber, formatRub } from "@/shared/lib";
import { Panel } from "@/shared/ui";
import { packDiscountPercent, packUnitPrice } from "../model/packs";
import type { CurrencyPack } from "../model/types";
import { CurrencyIcon } from "./CurrencyIcon";

export function PackCard({ pack, action }: { pack: CurrencyPack; action: ReactNode }) {
  const discount = packDiscountPercent(pack);

  return (
    <Panel as="article" highlight={pack.featured} className="relative flex flex-col p-6">
      {pack.featured ? (
        <span className="absolute -top-3 left-6 bg-gold px-2 py-1 font-display text-xs font-semibold uppercase tracking-wider text-black">
          Популярный
        </span>
      ) : null}

      <div className="flex items-center gap-3">
        <CurrencyIcon className="h-9 w-9 shrink-0" />
        <p className="font-display text-5xl font-bold leading-none tabular-nums text-gold">{formatNumber(pack.amount)}</p>
      </div>
      <p className="mt-2 text-sm text-muted">ед. игровой валюты</p>

      <div className="mt-6 flex items-end justify-between gap-4 border-t border-line pt-4">
        <p className="font-display text-3xl font-bold leading-none tabular-nums text-white">{formatRub(pack.priceRub)}</p>
        <p className="text-right text-xs leading-5 text-muted">
          {packUnitPrice(pack)} за 1 ед.
          {discount > 0 ? (
            <>
              <br />
              выгода {discount}%
            </>
          ) : null}
        </p>
      </div>

      <div className="mt-6">{action}</div>
    </Panel>
  );
}
