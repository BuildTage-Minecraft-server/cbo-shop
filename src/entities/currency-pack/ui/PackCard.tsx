import type { ReactNode } from "react";
import { cn, formatNumber, formatRub } from "@/shared/lib";
import { Panel } from "@/shared/ui";
import type { Accent } from "@/shared/ui";
import { packDiscountPercent, packUnitPrice } from "../model/packs";
import type { CurrencyPack } from "../model/types";
import { CurrencyIcon } from "./CurrencyIcon";

export function PackCard({ pack, action, accent = "cyan" }: { pack: CurrencyPack; action: ReactNode; accent?: Accent }) {
  const discount = packDiscountPercent(pack);

  return (
    <Panel as="article" accent={accent} bar="top" className={cn("flex flex-col p-6", pack.featured && "hud-glow")}>
      {pack.featured ? <span className="hud-tag absolute -top-3 right-4">Популярный</span> : null}

      <div className="flex items-center gap-4">
        <CurrencyIcon className="h-12 w-12 shrink-0" />
        <div>
          <p className="pixel-shadow font-pixel text-[32px] leading-none text-gold">{formatNumber(pack.amount)}</p>
          <p className="mt-2 font-pixel text-base text-muted">ед. валюты</p>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-4">
        <p className="pixel-shadow font-pixel text-[32px] leading-none text-white">{formatRub(pack.priceRub)}</p>
        <p className="mt-2 text-xs text-muted">
          {packUnitPrice(pack)} за 1 ед.{discount > 0 ? `, выгода ${discount}%` : ""}
        </p>
      </div>

      <div className="mt-6">{action}</div>
    </Panel>
  );
}
