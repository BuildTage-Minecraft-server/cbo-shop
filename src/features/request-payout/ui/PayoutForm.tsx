"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui";
import { requestPayoutAction } from "../api/request-payout";
import { initialPayoutState } from "../model/state";

const labelClass = "font-display text-sm font-medium uppercase tracking-wider text-muted";

export function PayoutForm({ amountLabel }: { amountLabel: string }) {
  const [state, formAction, pending] = useActionState(requestPayoutAction, initialPayoutState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <label className="flex flex-col gap-2">
        <span className={labelClass}>Реквизиты для выплаты</span>
        <input
          name="details"
          type="text"
          autoComplete="off"
          defaultValue={state.details}
          required
          minLength={5}
          maxLength={200}
          placeholder="Телефон для СБП и банк"
          className="field"
        />
        <span className="text-xs leading-5 text-muted">Сумма заявки: {amountLabel}, весь доступный остаток.</span>
      </label>

      {state.error ? (
        <p role="alert" className="text-sm text-hud-red">
          {state.error}
        </p>
      ) : null}

      <Button type="submit" size="lg" icon="download" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Отправляем..." : "Запросить выплату"}
      </Button>
    </form>
  );
}
