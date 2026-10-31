import { Faq, serverFaqItems } from "@/widgets/faq";
import { GameFeatures } from "@/widgets/game-features";
import { Hero } from "@/widgets/hero";
import { JoinGuide } from "@/widgets/join-guide";
import { ScreensGallery } from "@/widgets/screens-gallery";
import { ShopTeaser } from "@/widgets/shop-teaser";

export function HomePage() {
  return (
    <>
      <Hero />
      <GameFeatures />
      <ScreensGallery />
      <JoinGuide />
      <ShopTeaser />
      <Faq items={serverFaqItems} />
    </>
  );
}
