import { handlePaymentNotification } from "@/features/confirm-payment";

export function POST(request: Request): Promise<Response> {
  return handlePaymentNotification(request);
}
