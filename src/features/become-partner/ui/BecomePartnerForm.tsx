"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui";
import { becomePartnerAction } from "../api/become-partner";
import { initialBecomePartnerState } from "../model/state";

const labelClass = "font-display text-sm font-medium uppercase tracking-wider text-muted";

export function BecomePartnerForm({ origin }: { origin: string }) {
  const [state, formAction, pending] = useActionState(becomePartnerAction, initialBecomePartnerState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Ваш код</span>
        <input
          name="code"
          type="text"
          autoComplete="off"
          autoCapitalize="none"
          spellCheck={false}
          defaultValue={state.code}
          required
          minLength={3}
          maxLength={24}
          pattern="[A-Za-z0-9_\-]{3,24}"
          placeholder="mychannel"
          className="field"
        />
        <span className="text-xs leading-5 text-muted">
          От 3 до 24 символов: латинские буквы, цифры, дефис и подчёркивание. Ссылка будет вида {origin}/r/ваш-код.
        </span>
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-hud-red">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" icon="star" disabled={pending} className="w-full">
        {pending ? "Создаём ссылку..." : "Получить ссылку"}
      </Button>
    </form>
  );
}
