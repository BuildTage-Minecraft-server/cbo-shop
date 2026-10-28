import { HowItWorks } from "@/widgets/how-it-works";
import { PackShowcase } from "@/widgets/pack-showcase";

export function ShopPage() {
  return (
    <>
      <h1 className="sr-only">Магазин Обрыгаций</h1>
      <PackShowcase />
      <HowItWorks />
    </>
  );
}
