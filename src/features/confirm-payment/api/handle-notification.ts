import "server-only";
import { z } from "zod";
import { findPack } from "@/entities/currency-pack";
import { creditCurrency } from "@/shared/api/game-server";
import { getPayment } from "@/shared/api/yookassa";
import { paymentsConfig } from "@/shared/config/env";
import { isUuid } from "@/shared/lib";

const notificationSchema = z.object({
  event: z.string(),
  object: z.object({ id: z.string().min(1) }),
});

function accepted(): Response {
  return new Response(null, { status: 200 });
}

export async function handleYookassaNotification(request: Request): Promise<Response> {
  const body: unknown = await request.json().catch(() => null);
  const notification = notificationSchema.safeParse(body);
  if (!notification.success) {
    return new Response(null, { status: 400 });
  }
  if (notification.data.event !== "payment.succeeded") {
    return accepted();
  }

  try {
    const credentials = paymentsConfig();
    if (!credentials) {
      return new Response(null, { status: 503 });
    }

    const payment = await getPayment(credentials, notification.data.object.id);
    if (payment.status !== "succeeded" || !payment.paid) {
      return accepted();
    }

    const pack = findPack(payment.metadata?.packId);
    const playerUuid = payment.metadata?.playerUuid;
    const paidRub = Number(payment.amount.value);

    if (
      !pack ||
      !playerUuid ||
      !isUuid(playerUuid) ||
      payment.amount.currency !== "RUB" ||
      paidRub !== pack.priceRub
    ) {
      console.error("Payment with inconsistent data was skipped", payment.id);
      return accepted();
    }

    await creditCurrency({ paymentId: payment.id, playerUuid, amount: pack.amount });
    return accepted();
  } catch (error) {
    console.error("Failed to process a payment notification", error);
    return new Response(null, { status: 500 });
  }
}
