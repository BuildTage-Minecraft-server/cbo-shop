import Image from "next/image";
import { lobbyScreen } from "@/shared/assets";
import { Container, SectionHeading } from "@/shared/ui";

const categories = [
  {
    title: "Темы меню",
    text: "Меняют фон всех меню. Покупка навсегда, сменить тему можно в любой момент.",
  },
  {
    title: "Скины",
    text: "Косметическое оформление, которое меняет внешний вид в игре.",
  },
  {
    title: "Бустеры",
    text: "Усилители для игрового прогресса, например бустер монет.",
  },
  {
    title: "Слоты",
    text: "Дополнительные ячейки для ваших наборов снаряжения.",
  },
] as const;

export function ScreensGallery() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Донат-шоп"
          title="На что тратятся Обрыгации"
          description="Валюта работает только внутри игры. Донат-шоп открывается прямо из лобби, ассортимент может обновляться."
        />

        <div className="mt-10 grid items-start gap-8 lg:grid-cols-2">
          <ul className="grid gap-4 sm:grid-cols-2">
            {categories.map((category) => (
              <li key={category.title} className="rounded-xl border border-line bg-surface/70 p-5">
                <h3 className="font-semibold text-fg">{category.title}</h3>
                <p className="mt-2 text-sm text-muted">{category.text}</p>
              </li>
            ))}
          </ul>

          <figure className="rounded-xl border border-line-strong bg-surface p-2">
            <Image
              src={lobbyScreen}
              alt="Лобби игры: кнопка «Донатный магазин» в главном меню, баланс монет и уровень игрока"
              sizes="(min-width: 1024px) 560px, 100vw"
              className="h-auto w-full rounded-lg"
            />
            <figcaption className="px-2 pb-1 pt-3 text-xs text-muted">Лобби: донатный магазин доступен из главного меню.</figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
