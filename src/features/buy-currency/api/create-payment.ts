"use server";

import { randomUUID } from "node:crypto";
import { redirect } from "next/navigation";
import { z } from "zod";
import { findPack } from "@/entities/currency-pack";
import { getSession } from "@/entities/session";
import { createPayment } from "@/shared/api/yookassa";
import { routes, siteConfig } from "@/shared/config";
import { paymentsConfig } from "@/shared/config/env";
import { siteUrl } from "@/shared/config/site-url";
import { formatNumber } from "@/shared/lib";
import type { BuyState } from "../model/state";

const schema = z.object({ packId: z.string().min(1) });

export async function createPaymentAction(_previous: BuyState, formData: FormData): Promise<BuyState> {
  const session = await getSession();
  if (!session) {
    redirect(`${routes.login}?next=${encodeURIComponent(routes.shop)}`);
  }

  const parsed = schema.safeParse({ packId: formData.get("packId") });
  const pack = parsed.success ? findPack(parsed.data.packId) : undefined;
  if (!pack) {
    return { error: "Пакет не найден. Обновите страницу и попробуйте снова." };
  }

  let confirmationUrl: string | undefined;
  try {
    const credentials = paymentsConfig();
    if (!credentials) {
      return { error: "Приём платежей ещё подключается. Попробуйте позже." };
    }

    const payment = await createPayment(credentials, {
      amountRub: pack.priceRub,
      description: `${siteConfig.name}: ${formatNumber(pack.amount)} шт. для ${session.name}`,
      returnUrl: `${siteUrl()}${routes.paymentResult}`,
      idempotenceKey: randomUUID(),
      metadata: { playerUuid: session.uuid, playerName: session.name, packId: pack.id },
    });
    confirmationUrl = payment.confirmation?.confirmation_url;
  } catch (error) {
    console.error("Failed to create a payment", error);
    return { error: "Не удалось создать платёж. Попробуйте ещё раз чуть позже." };
  }

  if (!confirmationUrl) {
    return { error: "Платёжная система не вернула ссылку на оплату. Попробуйте ещё раз." };
  }

  redirect(confirmationUrl);
}
