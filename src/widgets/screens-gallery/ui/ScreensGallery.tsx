import Image from "next/image";
import { coinShopScreen, donatShopScreen } from "@/shared/assets";
import { siteConfig } from "@/shared/config";
import { Container, Frame, SectionHeading } from "@/shared/ui";

const shots = [
  {
    src: coinShopScreen,
    alt: `Магазин скинов игры ${siteConfig.name}: коллекция, редкости и полка с товарами`,
    title: "Магазин скинов",
    text: "Коллекция скинов оружия, семь редкостей и новая полка каждый день.",
  },
  {
    src: donatShopScreen,
    alt: `Донат-шоп игры ${siteConfig.name}: темы меню, слоты, бустеры и скины`,
    title: "Донат-шоп",
    text: "Темы меню, слоты, бустеры и скины для оформления игры.",
  },
] as const;

export function ScreensGallery() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading kicker="Скриншоты" title="Как это выглядит в игре" />
        <div className="mt-10 grid gap-8 md:grid-cols-2">
          {shots.map((shot) => (
            <figure key={shot.title}>
              <Frame>
                <Image
                  src={shot.src}
                  alt={shot.alt}
                  sizes="(min-width: 768px) 560px, 100vw"
                  className="block h-auto w-full border border-line-strong"
                />
              </Frame>
              <figcaption className="mt-3">
                <span className="font-display text-lg font-semibold text-white">{shot.title}</span>
                <span className="mt-1 block text-sm text-muted">{shot.text}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
