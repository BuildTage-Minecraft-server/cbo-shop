import Link from "next/link";
import { CURRENCY_PACKS, PackCard } from "@/entities/currency-pack";
import { getSession } from "@/entities/session";
import { BuyButton } from "@/features/buy-currency";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container, IconBox, Panel, SectionHeading } from "@/shared/ui";
import type { Accent } from "@/shared/ui";

const loginHref = `${routes.login}?next=${encodeURIComponent(routes.shop)}`;

const PACK_ACCENTS: readonly Accent[] = ["blue", "green", "purple", "pink", "orange", "yellow"];

export async function PackShowcase() {
  const session = await getSession();

  return (
    <section id="packs" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <SectionHeading
          kicker="Магазин"
          title="Пакеты игровой валюты"
          description={`Цены указаны в рублях. Оплата проходит через ${siteConfig.paymentProvider}, валюта начисляется автоматически.`}
        />

        <Panel accent="cyan" bar="left" className="mt-8 flex items-center gap-4 px-5 py-4">
          <IconBox icon="gem" accent="pink" />
          {session ? (
            <p className="text-sm text-body">
              Покупка для аккаунта <strong className="text-white">{session.name}</strong>. Валюта будет начислена на этот аккаунт.
            </p>
          ) : (
            <p className="text-sm text-body">
              Чтобы купить, войдите через аккаунт сервера. Валюта начисляется на тот аккаунт, под которым вы вошли.
            </p>
          )}
        </Panel>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CURRENCY_PACKS.map((pack, index) => (
            <PackCard
              key={pack.id}
              pack={pack}
              accent={PACK_ACCENTS[index % PACK_ACCENTS.length]}
              action={
                session ? (
                  <BuyButton packId={pack.id} label="Купить" />
                ) : (
                  <ButtonLink href={loginHref} size="lg" icon="user" className="w-full">
                    Войти и купить
                  </ButtonLink>
                )
              }
            />
          ))}
        </div>

        <p className="mt-6 text-xs text-muted">
          Нажимая «Купить», вы принимаете условия{" "}
          <Link href={routes.offer} className="text-neon-cyan underline underline-offset-4">
            публичной оферты
          </Link>{" "}
          и{" "}
          <Link href={routes.privacy} className="text-neon-cyan underline underline-offset-4">
            политики конфиденциальности
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
