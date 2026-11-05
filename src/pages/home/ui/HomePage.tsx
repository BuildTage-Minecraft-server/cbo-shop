import { Faq, serverFaqItems } from "@/widgets/faq";
import { GameFeatures } from "@/widgets/game-features";
import { Hero } from "@/widgets/hero";
import { JoinGuide } from "@/widgets/join-guide";
import { ModesPreview } from "@/widgets/modes-preview";
import { ScreensGallery } from "@/widgets/screens-gallery";

export function HomePage() {
  return (
    <>
      <Hero />
      <GameFeatures />
      <ModesPreview />
      <ScreensGallery />
      <JoinGuide />
      <Faq items={serverFaqItems} />
    </>
  );
}
