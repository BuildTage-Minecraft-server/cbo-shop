import { Faq } from "@/widgets/faq";
import { Hero } from "@/widgets/hero";
import { HowItWorks } from "@/widgets/how-it-works";
import { PackShowcase } from "@/widgets/pack-showcase";
import { ScreensGallery } from "@/widgets/screens-gallery";

export function HomePage() {
  return (
    <>
      <Hero />
      <ScreensGallery />
      <PackShowcase />
      <HowItWorks />
      <Faq />
    </>
  );
}
