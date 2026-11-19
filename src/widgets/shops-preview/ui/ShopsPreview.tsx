import { routes } from "@/shared/config";
import { ButtonLink, Container, Panel, SectionHeading } from "@/shared/ui";
import { MediaSlot } from "@/shared/ui/MediaSlot";

const shops = [
  {
    slot: "shops/coin",
    mediaLabel: "Скриншот: магазин за монеты",
    title: "Магазин за монеты",
    text: "Продавец-NPC торгует за монеты, заработанные в матчах. Полка обновляется каждый день.",
    points: ["Аптечки, гранаты, броня и патроны", "Перки и облики", "Коллекция из 600+ скинов оружия"],
  },
  {
    slot: "shops/donat",
    mediaLabel: "Скриншот: донат-магазин",
    title: "Донат-магазин",
    text: "Дополнительные удобства и оформление. Донат-валюта копится за игру и задания, а при желании её можно пополнить на сайте.",
    points: [
      "Дополнительные слоты наборов и копирование кода набора",
      "Бустеры опыта и монет: +50% на один час",
      "Темы меню: «Матрица», «Космос», «Сакура», «Лава» и другие",
      "Скины оружия",
    ],
    action: true,
  },
] as const;

export function ShopsPreview() {
  return (
    <section id="shops" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading
          title="Магазины"
          description="Монеты вы зарабатываете в матчах. Донат-валюта тоже копится за игру, но её можно и пополнить на сайте."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {shops.map((shop) => (
            <Panel key={shop.title} as="article" className="flex flex-col p-6">
              <MediaSlot slot={shop.slot} alt={shop.mediaLabel} label={shop.mediaLabel} glow={false} sizes="(min-width: 768px) 520px, 100vw" />
              <h3 className="mt-6 font-display text-3xl font-semibold uppercase tracking-wide text-white">{shop.title}</h3>
              <p className="mt-3 leading-7 text-body">{shop.text}</p>
              <ul className="mt-5 flex-1 space-y-2">
                {shop.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-body">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
              {"action" in shop ? (
                <div className="mt-6">
                  <ButtonLink href={routes.shop} variant="secondary" icon="cart">
                    Пополнить валюту
                  </ButtonLink>
                </div>
              ) : null}
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
