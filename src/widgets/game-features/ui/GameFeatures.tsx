import { Container, SectionHeading } from "@/shared/ui";
import type { Accent } from "@/shared/ui";

const stats = [
  { value: "600+", label: "скинов оружия в коллекции" },
  { value: "7", label: "уровней редкости, от обычных до секретных" },
  { value: "Каждый день", label: "новые товары на полке магазина" },
] as const;

const menu: ReadonlyArray<{ label: string; tone: Accent }> = [
  { label: "Найти матч", tone: "green" },
  { label: "Создать матч", tone: "cyan" },
  { label: "Текущие матчи", tone: "red" },
  { label: "Статистика", tone: "blue" },
  { label: "Лидеры", tone: "purple" },
  { label: "Снаряжение", tone: "blue" },
  { label: "Задания", tone: "orange" },
  { label: "Магазин", tone: "yellow" },
  { label: "Донатный магазин", tone: "pink" },
];

export function GameFeatures() {
  return (
    <section id="features" className="scroll-mt-24">
      <div className="border-y border-line bg-surface/50">
        <Container className="py-10">
          <dl className="grid gap-8 sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-accent pl-5">
                <dt className="font-display text-5xl font-bold leading-none text-white">{stat.value}</dt>
                <dd className="mt-2 text-sm text-body">{stat.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </div>

      <Container className="py-12 md:py-20">
        <SectionHeading
          title="Всё главное в одном меню"
          description="Лобби открывает матчи, прогресс, снаряжение и оба магазина."
        />
        <ul className="mt-8 flex flex-wrap gap-3">
          {menu.map((item) => (
            <li key={item.label} className={`chip tone-${item.tone}`}>
              {item.label}
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
