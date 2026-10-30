"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui";
import { loginAction } from "../api/login";
import { initialLoginState } from "../model/state";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialLoginState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <label className="flex flex-col gap-2">
        <span className="font-pixel text-base text-muted">Ник или логин</span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          defaultValue={state.username}
          required
          maxLength={64}
          className="hud-input"
        />
      </label>

      <label className="flex flex-col gap-2">
        <span className="font-pixel text-base text-muted">Пароль</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={256}
          className="hud-input"
        />
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-hud-red">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" accent="cyan" icon="user" disabled={pending} className="w-full">
        {pending ? "Проверяем..." : "Войти"}
      </Button>
    </form>
  );
}
