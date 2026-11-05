import Image from "next/image";
import type { ReactNode } from "react";
import { coinShopScreen, donatShopScreen } from "@/shared/assets";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";
import type { StaticImageData } from "next/image";

type Shot = {
  src: StaticImageData;
  alt: string;
  title: string;
  text: string;
  points: readonly string[];
  action?: ReactNode;
};

const shots: readonly Shot[] = [
  {
    src: coinShopScreen,
    alt: `Магазин игры ${siteConfig.name}: коллекция скинов, редкости и полка с товарами`,
    title: "Магазин",
    text: "Продавец-NPC торгует за монеты, заработанные в игре. Полка обновляется каждый день.",
    points: ["Аптечки, гранаты, броня и патроны", "Перки и облики, коллекция из 600+ скинов оружия", "Новые товары на полке каждый день"],
  },
  {
    src: donatShopScreen,
    alt: `Донат-шоп игры ${siteConfig.name}: темы меню, слоты, бустеры и скины`,
    title: "Донат-шоп",
    text: "Дополнительные удобства и оформление. Донат-валюта копится и за игру, и за задания, а пополнить её можно на сайте.",
    points: [
      "Дополнительные слоты наборов и копирование кода набора",
      "Бустеры опыта и монет: +50% на час",
      "Темы меню «Матрица», «Космос», «Сакура», «Лава» и другие",
      "Скины оружия",
    ],
    action: (
      <ButtonLink href={routes.shop} variant="secondary" icon="cart">
        Пополнить валюту
      </ButtonLink>
    ),
  },
];

export function ScreensGallery() {
  return (
    <section>
      <Container className="space-y-20 pb-12 md:pb-20">
        {shots.map((shot) => (
          <article key={shot.title}>
            <div className="grid gap-6 md:grid-cols-2 md:gap-12">
              <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
                {shot.title}
              </h2>
              <div>
                <p className="text-lg leading-8 text-body">{shot.text}</p>
                <ul className="mt-5 space-y-2">
                  {shot.points.map((point) => (
                    <li key={point} className="flex gap-3 text-body">
                      <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
                {shot.action ? <div className="mt-7">{shot.action}</div> : null}
              </div>
            </div>
            <Image
              src={shot.src}
              alt={shot.alt}
              sizes="(min-width: 1200px) 1152px, 100vw"
              className="mt-8 block h-auto w-full border border-line-strong"
            />
          </article>
        ))}
      </Container>
    </section>
  );
}
