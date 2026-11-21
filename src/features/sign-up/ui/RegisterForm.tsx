"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui";
import { registerAction } from "../api/register";
import { initialRegisterState } from "../model/state";

const labelClass = "font-display text-sm font-medium uppercase tracking-wider text-muted";
const hintClass = "text-xs leading-5 text-muted";

export function RegisterForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(registerAction, initialRegisterState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <input type="hidden" name="next" value={next} />

      <div aria-hidden="true" className="sr-only">
        <label>
          Не заполняйте это поле
          <input name="website" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Ник</span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          defaultValue={state.username}
          required
          minLength={3}
          maxLength={16}
          pattern="[A-Za-z0-9_]{3,16}"
          className="field"
        />
        <span className={hintClass}>От 3 до 16 символов: латинские буквы, цифры и подчёркивание.</span>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Пароль</span>
        <input name="password" type="password" autoComplete="new-password" required minLength={8} maxLength={128} className="field" />
        <span className={hintClass}>Не короче 8 символов.</span>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelClass}>Повторите пароль</span>
        <input name="confirm" type="password" autoComplete="new-password" required minLength={8} maxLength={128} className="field" />
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-hud-red">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" icon="user" disabled={pending} className="w-full">
        {pending ? "Создаём аккаунт..." : "Создать аккаунт"}
      </Button>
    </form>
  );
}
