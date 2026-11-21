import { routes } from "@/shared/config";
import { ButtonLink, Container, Panel, SectionHeading } from "@/shared/ui";
import { MediaSlot } from "@/shared/ui/MediaSlot";

const shops = [
  {
    slot: "shops/coin",
    mediaLabel: "Скриншот: магазин за монеты",
    title: "Магазин за монеты",
    text: "Аптечки, гранаты, броня, патроны, перки и облики. Полка обновляется каждый день.",
  },
  {
    slot: "shops/donat",
    mediaLabel: "Скриншот: донат-магазин",
    title: "Донат-магазин",
    text: "Слоты наборов, бустеры опыта и монет, темы меню и скины оружия.",
    action: true,
  },
] as const;

export function ShopsPreview() {
  return (
    <section id="shops" className="border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Магазины" />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {shops.map((shop) => (
            <Panel key={shop.title} as="article" className="flex flex-col p-6">
              <MediaSlot slot={shop.slot} alt={shop.mediaLabel} label={shop.mediaLabel} glow={false} sizes="(min-width: 768px) 520px, 100vw" />
              <h3 className="mt-6 font-display text-3xl font-semibold uppercase tracking-wide text-white">{shop.title}</h3>
              <p className="mt-3 flex-1 leading-7 text-body">{shop.text}</p>
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
