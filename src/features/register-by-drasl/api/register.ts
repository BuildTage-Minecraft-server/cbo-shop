"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/entities/session";
import { authenticateWithDrasl, DraslRegisterError, registerInDrasl } from "@/shared/api/drasl";
import { gameServer, routes } from "@/shared/config";
import { safeInternalPath } from "@/shared/lib";
import type { RegisterState } from "../model/state";

const USERNAME_PATTERN = /^[A-Za-z0-9_]{3,16}$/;

function text(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value : "";
}

export async function registerAction(_previous: RegisterState, formData: FormData): Promise<RegisterState> {
  const username = text(formData.get("username")).trim();
  const password = text(formData.get("password"));
  const confirm = text(formData.get("confirm"));
  const next = text(formData.get("next"));

  if (text(formData.get("website")) !== "") {
    return { error: "Не удалось создать аккаунт. Попробуйте ещё раз.", username };
  }
  if (!gameServer.registrationEnabled) {
    return { error: "Регистрация на сайте пока недоступна.", username };
  }
  if (!USERNAME_PATTERN.test(username)) {
    return { error: "Ник: от 3 до 16 символов, латинские буквы, цифры и подчёркивание.", username };
  }
  if (password.length < 8 || password.length > 128) {
    return { error: "Пароль: от 8 до 128 символов.", username };
  }
  if (password !== confirm) {
    return { error: "Пароли не совпадают.", username };
  }

  try {
    await registerInDrasl(username, password);
  } catch (error) {
    if (error instanceof DraslRegisterError) {
      if (error.kind === "username-taken") {
        return { error: "Этот ник уже занят. Выберите другой.", username };
      }
      if (error.kind === "invalid-username") {
        return { error: "Сервер авторизации не принял этот ник. Выберите другой.", username };
      }
      if (error.kind === "invalid-password") {
        return { error: "Сервер авторизации не принял этот пароль. Придумайте другой.", username };
      }
    }
    console.error("Registration through Drasl failed", error);
    return { error: "Не удалось создать аккаунт. Попробуйте позже.", username };
  }

  try {
    const player = await authenticateWithDrasl(username, password);
    await createSession(player);
  } catch (error) {
    console.error("Sign-in after registration failed", error);
    return { error: "Аккаунт создан, но войти автоматически не получилось. Войдите на странице входа.", username };
  }

  redirect(safeInternalPath(next, routes.join));
}
