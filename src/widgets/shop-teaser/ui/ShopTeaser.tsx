import { routes } from "@/shared/config";
import { ButtonLink, Container, IconBox, Panel, SectionHeading } from "@/shared/ui";
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

export function ShopTeaser() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Донат-шоп"
          title="Игровая валюта и донат-шоп"
          description="В игре есть донат-шоп. Его товары покупаются за внутриигровую валюту, а пополнить её можно в магазине на сайте."
        />
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Panel key={category.title} as="li" accent={category.accent} bar="left" className="flex gap-4 p-4">
              <IconBox icon={category.icon} scale={3} className="h-12 w-12" />
              <div>
                <h3 className="font-display text-lg font-semibold text-white">{category.title}</h3>
                <p className="mt-2 text-sm text-body">{category.text}</p>
              </div>
            </Panel>
          ))}
        </ul>
        <div className="mt-8">
          <ButtonLink href={routes.shop} size="lg" icon="cart">
            Пополнить валюту
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
