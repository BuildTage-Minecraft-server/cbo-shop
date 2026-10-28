import { LegalDocument } from "@/widgets/legal-document";
import { deliveryIntro, deliverySections } from "../model/sections";

export function DeliveryPage() {
  return <LegalDocument title="Получение заказа" intro={deliveryIntro} sections={deliverySections} numbered={false} />;
}
