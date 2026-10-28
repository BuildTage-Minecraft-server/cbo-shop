"use client";

import { useActionState } from "react";
import { Button } from "@/shared/ui";
import { createPaymentAction } from "../api/create-payment";
import { initialBuyState } from "../model/state";

export function BuyButton({ packId, label }: { packId: string; label: string }) {
  const [state, formAction, pending] = useActionState(createPaymentAction, initialBuyState);

  return (
    <form action={formAction} className="flex flex-col gap-2">
      <input type="hidden" name="packId" value={packId} />
      <Button type="submit" size="lg" disabled={pending} className="w-full">
        {pending ? "Создаём платёж..." : label}
      </Button>
      {state.error ? (
        <p role="alert" className="text-sm text-neon-pink">
          {state.error}
        </p>
      ) : null}
    </form>
  );
}
