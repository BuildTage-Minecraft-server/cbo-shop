import "server-only";
import type { PaymentsConfig } from "@/shared/config/env";

const API_URL = "https://api.yookassa.ru/v3";

export type YookassaPayment = {
  id: string;
  status: "pending" | "waiting_for_capture" | "succeeded" | "canceled";
  paid: boolean;
  amount: { value: string; currency: string };
  metadata?: Record<string, string>;
  confirmation?: { type: string; confirmation_url?: string };
};

export type CreatePaymentInput = {
  amountRub: number;
  description: string;
  returnUrl: string;
  idempotenceKey: string;
  metadata: Record<string, string>;
};

export class YookassaError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "YookassaError";
    this.status = status;
  }
}

type RequestOptions = {
  method: "GET" | "POST";
  body?: unknown;
  idempotenceKey?: string;
};

async function request<T>(credentials: PaymentsConfig, path: string, options: RequestOptions): Promise<T> {
  const token = Buffer.from(`${credentials.shopId}:${credentials.secretKey}`).toString("base64");
  const headers: Record<string, string> = { Authorization: `Basic ${token}` };
  if (options.body !== undefined) headers["Content-Type"] = "application/json";
  if (options.idempotenceKey) headers["Idempotence-Key"] = options.idempotenceKey;

  const response = await fetch(`${API_URL}${path}`, {
    method: options.method,
    headers,
    body: options.body === undefined ? undefined : JSON.stringify(options.body),
    cache: "no-store",
    signal: AbortSignal.timeout(10000),
  });

  if (!response.ok) {
    const details = await response.text().catch(() => "");
    throw new YookassaError(response.status, `YooKassa responded with ${response.status}: ${details.slice(0, 500)}`);
  }

  return (await response.json()) as T;
}

export function createPayment(credentials: PaymentsConfig, input: CreatePaymentInput): Promise<YookassaPayment> {
  return request<YookassaPayment>(credentials, "/payments", {
    method: "POST",
    idempotenceKey: input.idempotenceKey,
    body: {
      amount: { value: input.amountRub.toFixed(2), currency: "RUB" },
      capture: true,
      confirmation: { type: "redirect", return_url: input.returnUrl },
      description: input.description.slice(0, 128),
      metadata: input.metadata,
    },
  });
}

export function getPayment(credentials: PaymentsConfig, paymentId: string): Promise<YookassaPayment> {
  return request<YookassaPayment>(credentials, `/payments/${encodeURIComponent(paymentId)}`, { method: "GET" });
}
