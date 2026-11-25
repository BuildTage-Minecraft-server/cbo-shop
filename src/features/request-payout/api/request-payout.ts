"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { findPartnerByPlayer, requestPayout } from "@/entities/partner";
import { getSession } from "@/entities/session";
import { partnerProgram, routes } from "@/shared/config";
import type { PayoutState } from "../model/state";

const MIN_DETAILS_LENGTH = 5;
const MAX_DETAILS_LENGTH = 200;

export async function requestPayoutAction(_previous: PayoutState, formData: FormData): Promise<PayoutState> {
  const session = await getSession();
  if (!session) {
    redirect(`${routes.login}?next=${encodeURIComponent(routes.partner)}`);
  }

  const raw = formData.get("details");
  const details = (typeof raw === "string" ? raw : "").replace(/\s+/g, " ").trim();

  if (!partnerProgram.enabled) {
    return { error: "Партнёрская программа пока недоступна.", details, done: false };
  }
  if (details.length < MIN_DETAILS_LENGTH || details.length > MAX_DETAILS_LENGTH) {
    return { error: "Укажите реквизиты: телефон для СБП и банк либо номер карты.", details, done: false };
  }

  try {
    const partner = await findPartnerByPlayer(session.uuid);
    if (!partner) {
      return { error: "Сначала подключите партнёрскую программу.", details, done: false };
    }

    const result = await requestPayout(partner.id, details, partnerProgram.minPayoutRub * 100);
    if (result.kind === "already-pending") {
      return { error: "Предыдущая заявка ещё в обработке.", details, done: false };
    }
    if (result.kind === "too-small") {
      return { error: `Минимальная сумма выплаты: ${partnerProgram.minPayoutRub} ₽.`, details, done: false };
    }
  } catch (error) {
    console.error("Failed to create a payout request", error);
    return { error: "Не удалось создать заявку. Попробуйте позже.", details, done: false };
  }

  revalidatePath(routes.partner);
  return { error: null, details: "", done: true };
}
