"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createSession } from "@/entities/session";
import { authenticateWithDrasl, DraslAuthError } from "@/shared/api/drasl";
import { routes } from "@/shared/config";
import { safeInternalPath } from "@/shared/lib";
import type { LoginState } from "../model/state";

const schema = z.object({
  username: z.string().trim().min(1).max(64),
  password: z.string().min(1).max(256),
  next: z.string().optional(),
});

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  const rawUsername = formData.get("username");
  const username = typeof rawUsername === "string" ? rawUsername.trim() : "";

  const parsed = schema.safeParse({
    username,
    password: formData.get("password"),
    next: formData.get("next") ?? undefined,
  });
  if (!parsed.success) {
    return { error: "Введите ник и пароль.", username };
  }

  try {
    const player = await authenticateWithDrasl(parsed.data.username, parsed.data.password);
    await createSession(player);
  } catch (error) {
    if (error instanceof DraslAuthError && error.kind === "invalid-credentials") {
      return { error: "Неверный ник или пароль.", username };
    }
    if (error instanceof DraslAuthError && error.kind === "rate-limited") {
      return { error: "Слишком много попыток входа. Подождите немного и повторите.", username };
    }
    console.error("Login through Drasl failed", error);
    return { error: "Сервер авторизации сейчас недоступен. Попробуйте позже.", username };
  }

  redirect(safeInternalPath(parsed.data.next, routes.shop));
}
