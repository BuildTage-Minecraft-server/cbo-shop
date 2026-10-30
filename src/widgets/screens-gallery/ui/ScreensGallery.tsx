import Image from "next/image";
import { lobbyScreen } from "@/shared/assets";
import { siteConfig } from "@/shared/config";
import { Container, Frame, IconBox, Panel, SectionHeading } from "@/shared/ui";
import type { Accent, IconName } from "@/shared/ui";

const categories: ReadonlyArray<{ title: string; text: string; icon: IconName; accent: Accent }> = [
  {
    title: "Темы меню",
    text: "Меняют фон всех меню. Покупка навсегда, сменить тему можно в любой момент.",
    icon: "monitor",
    accent: "pink",
  },
  {
    title: "Скины",
    text: "Косметическое оформление, которое меняет внешний вид в игре.",
    icon: "shirt",
    accent: "blue",
  },
  {
    title: "Бустеры",
    text: "Усилители для игрового прогресса, например бустер монет.",
    icon: "bolt",
    accent: "orange",
  },
  {
    title: "Слоты",
    text: "Дополнительные ячейки для ваших наборов снаряжения.",
    icon: "grid",
    accent: "green",
  },
];

export function ScreensGallery() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Донат-шоп"
          title="На что тратится валюта"
          description="Валюта работает только внутри игры. Донат-шоп открывается прямо из лобби, ассортимент может обновляться."
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <ul className="grid gap-5 sm:grid-cols-2">
            {categories.map((category) => (
              <Panel key={category.title} as="li" accent={category.accent} bar="left" className="flex gap-4 p-4">
                <IconBox icon={category.icon} scale={3} className="h-12 w-12" />
                <div>
                  <h3 className="pixel-shadow font-pixel text-base uppercase text-white">{category.title}</h3>
                  <p className="mt-2 text-sm text-body">{category.text}</p>
                </div>
              </Panel>
            ))}
          </ul>

          <figure>
            <Frame>
              <Image
                src={lobbyScreen}
                alt={`Лобби игры ${siteConfig.name}: кнопка «Донатный магазин» в главном меню, баланс монет и уровень игрока`}
                sizes="(min-width: 1024px) 560px, 100vw"
                className="block h-auto w-full border border-line-strong"
              />
            </Frame>
            <figcaption className="mt-3 font-pixel text-base text-muted">Лобби: донатный магазин в главном меню.</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
