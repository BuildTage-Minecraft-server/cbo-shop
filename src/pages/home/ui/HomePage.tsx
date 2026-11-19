import { CustomPlay } from "@/widgets/custom-play";
import { Faq, serverFaqItems } from "@/widgets/faq";
import { FeatureShowcase } from "@/widgets/feature-showcase";
import { GameFeatures } from "@/widgets/game-features";
import { GameLoop } from "@/widgets/game-loop";
import { Hero } from "@/widgets/hero";
import { JoinGuide } from "@/widgets/join-guide";
import { ModesPreview } from "@/widgets/modes-preview";
import { ScreensReel } from "@/widgets/screens-reel";
import { ShopsPreview } from "@/widgets/shops-preview";

export function HomePage() {
  return (
    <>
      <Hero />
      <GameFeatures />
      <GameLoop />
      <ModesPreview />
      <FeatureShowcase />
      <CustomPlay />
      <ScreensReel />
      <JoinGuide />
      <ShopsPreview />
      <Faq items={serverFaqItems} />
    </>
  );
}
