import { Container, IconBox, Panel, SectionHeading } from "@/shared/ui";
import type { Accent, IconName } from "@/shared/ui";

const features: ReadonlyArray<{ title: string; text: string; icon: IconName; accent: Accent }> = [
  {
    title: "Матчи",
    text: "Находите матч, смотрите текущие или создавайте свой прямо из лобби.",
    icon: "target",
    accent: "green",
  },
  {
    title: "Статистика и лидеры",
    text: "Личная статистика и общий рейтинг игроков всегда под рукой.",
    icon: "bars",
    accent: "blue",
  },
  {
    title: "Снаряжение",
    text: "Собирайте наборы снаряжения под свой стиль игры.",
    icon: "shield",
    accent: "purple",
  },
  {
    title: "Задания",
    text: "Игровые задания доступны прямо из главного меню.",
    icon: "list",
    accent: "orange",
  },
  {
    title: "Уровни и ранги",
    text: "Уровень и ранг игрока, например «Сержант», отображаются в лобби.",
    icon: "star",
    accent: "yellow",
  },
  {
    title: "Магазин скинов",
    text: "Коллекция из 600+ скинов оружия семи редкостей, новые товары на полке каждый день.",
    icon: "cart",
    accent: "pink",
  },
];

export function GameFeatures() {
  return (
    <section id="features" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Что внутри"
          title="Всё для игры в одном лобби"
          description="Единое меню с матчами, рейтингом, снаряжением и магазином."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Panel key={feature.title} as="li" accent={feature.accent} bar="left" className="flex gap-4 p-5">
              <IconBox icon={feature.icon} scale={3} className="h-12 w-12" />
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-body">{feature.text}</p>
              </div>
            </Panel>
          ))}
        </ul>
      </Container>
    </section>
  );
}
