import type { Metadata } from "next";
import { PaymentResultPage } from "@/pages/payment-result";

export const metadata: Metadata = {
  title: "Статус оплаты",
  robots: { index: false, follow: false },
};

export default PaymentResultPage;
