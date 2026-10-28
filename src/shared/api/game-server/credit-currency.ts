import "server-only";
import { gameServerConfig } from "@/shared/config/env";

export type CreditCurrencyInput = {
  paymentId: string;
  playerUuid: string;
  amount: number;
};

export async function creditCurrency(input: CreditCurrencyInput): Promise<void> {
  const { url, token } = gameServerConfig();

  const response = await fetch(`${url}/credits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "Idempotency-Key": input.paymentId,
    },
    body: JSON.stringify(input),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    throw new Error(`Game server rejected the credit with status ${response.status}`);
  }
}
