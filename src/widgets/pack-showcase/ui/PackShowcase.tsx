import Link from "next/link";
import { CURRENCY_PACKS, PackCard } from "@/entities/currency-pack";
import { getSession } from "@/entities/session";
import { BuyButton } from "@/features/buy-currency";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container, SectionHeading } from "@/shared/ui";

const loginHref = `${routes.login}?next=${encodeURIComponent(routes.shop)}`;

export async function PackShowcase() {
  const session = await getSession();

  return (
    <section id="packs" className="scroll-mt-24">
      <Container className="py-12 md:py-16">
        <SectionHeading
          title="Пакеты игровой валюты"
          description={`Цены указаны в рублях. Оплата проходит через ${siteConfig.paymentProvider}, валюта начисляется автоматически.`}
        />

        <div className="mt-8 border-l-2 border-accent bg-surface px-5 py-4 text-sm leading-6 text-body">
          {session ? (
            <p>
              Покупка для аккаунта <strong className="text-white">{session.name}</strong>. Валюта будет начислена на этот аккаунт.
            </p>
          ) : (
            <p>Чтобы купить, войдите через аккаунт сервера. Валюта начисляется на тот аккаунт, под которым вы вошли.</p>
          )}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CURRENCY_PACKS.map((pack) => (
            <PackCard
              key={pack.id}
              pack={pack}
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
          <Link href={routes.offer} className="text-accent underline underline-offset-4">
            публичной оферты
          </Link>{" "}
          и{" "}
          <Link href={routes.privacy} className="text-accent underline underline-offset-4">
            политики конфиденциальности
          </Link>
          .
        </p>
      </Container>
    </section>
  );
}
