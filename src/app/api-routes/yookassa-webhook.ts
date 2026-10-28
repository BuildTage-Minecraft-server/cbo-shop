import { handleYookassaNotification } from "@/features/confirm-payment";

export function POST(request: Request): Promise<Response> {
  return handleYookassaNotification(request);
}
