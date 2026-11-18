import Link from "next/link";
import { routes } from "@/shared/config";
import { ButtonLink, Container, Panel, PixelIcon, SectionHeading } from "@/shared/ui";
import type { Accent, IconName } from "@/shared/ui";

type Highlight = {
  title: string;
  text: string;
  href: string;
  icon: IconName;
  accent: Accent;
};

const highlights: readonly Highlight[] = [
  {
    title: "Своё снаряжение",
    text: "Основное и запасное оружие, ближний бой, граната, броня и три перка. Обвесы, несколько наборов и сборки, которыми можно поделиться кодом.",
    href: `${routes.game}#loadout`,
    icon: "shield",
    accent: "blue",
  },
  {
    title: "Скины оружия",
    text: "Больше 600 скинов: градиенты, камуфляж, инкрустации и анимированные свечения. Есть система редкости и 3D-просмотр.",
    href: `${routes.game}#skins`,
    icon: "gem",
    accent: "pink",
  },
  {
    title: "Прокачка и задания",
    text: "100 уровней и 21 звание, от «Новобранца» до «Легенды». Ежедневные и еженедельные задания, титулы за достижения.",
    href: `${routes.game}#progress`,
    icon: "star",
    accent: "yellow",
  },
  {
    title: "Рейтинги и статистика",
    text: "Недельные и месячные рейтинги по убийствам, K/D и проценту побед. Победители получают призы и титул чемпиона.",
    href: `${routes.game}#seasons`,
    icon: "bars",
    accent: "green",
  },
  {
    title: "Реплеи",
    text: "Каждый матч записывается, и его можно пересмотреть глазами любого игрока: пауза, перемотка и свободная камера.",
    href: `${routes.game}#replays`,
    icon: "monitor",
    accent: "purple",
  },
  {
    title: "Свои матчи и карты",
    text: "Создайте матч с собственными правилами или соберите карту во встроенном редакторе, без программирования.",
    href: `${routes.game}#custom-match`,
    icon: "grid",
    accent: "orange",
  },
];

export function GameHighlights() {
  return (
    <section id="inside" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading
          title="Что внутри"
          description="Это полноценная игра, а не мини-режим на пару кнопок: у неё есть прокачка, коллекция, рейтинги и реплеи."
        />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {highlights.map((item) => (
            <Panel key={item.title} as="article" accent={item.accent} className="flex flex-col p-6">
              <div className="flex h-7 items-center">
                <PixelIcon name={item.icon} scale={3} className="tone-text" />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-white">{item.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-body">{item.text}</p>
              <Link href={item.href} className="mt-5 text-sm font-semibold text-accent underline-offset-4 hover:underline">
                Подробнее
              </Link>
            </Panel>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href={routes.game} variant="secondary" size="lg">
            Все возможности
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
