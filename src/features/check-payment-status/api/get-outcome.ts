import "server-only";
import { recallPayment } from "@/entities/payment";
import { getSession } from "@/entities/session";
import { getPayment } from "@/shared/api/yookassa";
import type { YookassaPayment } from "@/shared/api/yookassa";
import { paymentsConfig } from "@/shared/config/env";
import type { PaymentOutcome } from "../model/types";

function toOutcome(payment: YookassaPayment): PaymentOutcome {
  if (payment.status === "succeeded" && payment.paid) return "paid";
  if (payment.status === "canceled") return "canceled";
  return "pending";
}

export async function getPaymentOutcome(): Promise<PaymentOutcome> {
  const session = await getSession();
  const paymentId = await recallPayment();
  if (!session || !paymentId) return "unknown";

  try {
    const credentials = paymentsConfig();
    if (!credentials) return "unknown";

    const payment = await getPayment(credentials, paymentId);
    if (payment.metadata?.playerUuid !== session.uuid) return "unknown";

    return toOutcome(payment);
  } catch (error) {
    console.error("Failed to read the payment status", error);
    return "unknown";
  }
}
