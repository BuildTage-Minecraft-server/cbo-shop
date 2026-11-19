import { Faq, serverFaqItems } from "@/widgets/faq";
import { GameFeatures } from "@/widgets/game-features";
import { GameHighlights } from "@/widgets/game-highlights";
import { Hero } from "@/widgets/hero";
import { JoinGuide } from "@/widgets/join-guide";
import { ModesPreview } from "@/widgets/modes-preview";
import { ScreensGallery } from "@/widgets/screens-gallery";
import { ScreensReel } from "@/widgets/screens-reel";

export function HomePage() {
  return (
    <>
      <Hero />
      <GameFeatures />
      <ModesPreview />
      <GameHighlights />
      <ScreensReel />
      <ScreensGallery />
      <JoinGuide />
      <Faq items={serverFaqItems} />
    </>
  );
}
