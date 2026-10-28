"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui";
import { loginAction } from "../api/login";
import { initialLoginState } from "../model/state";

const fieldClass =
  "h-11 rounded-md border border-line-strong bg-ink px-3 text-base text-fg outline-none transition placeholder:text-muted/60 focus:border-neon-cyan focus:shadow-[0_0_0_3px_rgb(77_227_255/0.15)]";

export function LoginForm({ next }: { next: string }) {
  const [state, formAction, pending] = useActionState(loginAction, initialLoginState);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <input type="hidden" name="next" value={next} />

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Ник или логин</span>
        <input
          name="username"
          type="text"
          autoComplete="username"
          defaultValue={state.username}
          required
          maxLength={64}
          className={fieldClass}
        />
      </label>

      <label className="flex flex-col gap-1.5 text-sm">
        <span className="text-muted">Пароль</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          maxLength={256}
          className={fieldClass}
        />
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-neon-pink">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Проверяем..." : "Войти"}
      </Button>
    </form>
  );
}
