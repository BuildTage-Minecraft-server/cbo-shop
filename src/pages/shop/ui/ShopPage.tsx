import { Faq, shopFaqItems } from "@/widgets/faq";
import { HowItWorks } from "@/widgets/how-it-works";
import { PackShowcase } from "@/widgets/pack-showcase";

export function ShopPage() {
  return (
    <>
      <h1 className="sr-only">Магазин игровой валюты</h1>
      <PackShowcase />
      <HowItWorks />
      <Faq items={shopFaqItems} />
    </>
  );
}
