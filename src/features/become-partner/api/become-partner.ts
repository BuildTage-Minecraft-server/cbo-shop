"use server";

import { redirect } from "next/navigation";
import { createPartner, isValidCode, normalizeCode } from "@/entities/partner";
import { getSession } from "@/entities/session";
import { partnerProgram, routes } from "@/shared/config";
import type { BecomePartnerState } from "../model/state";

export async function becomePartnerAction(_previous: BecomePartnerState, formData: FormData): Promise<BecomePartnerState> {
  const session = await getSession();
  if (!session) {
    redirect(`${routes.login}?next=${encodeURIComponent(routes.partner)}`);
  }

  const raw = formData.get("code");
  const code = typeof raw === "string" ? normalizeCode(raw) : "";

  if (!partnerProgram.enabled) {
    return { error: "Партнёрская программа пока недоступна.", code };
  }
  if (!isValidCode(code)) {
    return { error: "Код: от 3 до 24 символов, латинские буквы, цифры, дефис и подчёркивание.", code };
  }

  try {
    const result = await createPartner({
      playerUuid: session.uuid,
      playerName: session.name,
      code,
      rateBps: partnerProgram.commissionPercent * 100,
    });
    if (result.kind === "code-taken") {
      return { error: "Этот код уже занят. Выберите другой.", code };
    }
  } catch (error) {
    console.error("Failed to create a partner", error);
    return { error: "Не удалось подключить программу. Попробуйте позже.", code };
  }

  redirect(routes.partner);
}
