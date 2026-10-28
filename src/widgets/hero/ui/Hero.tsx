import Image from "next/image";
import { donatShopScreen } from "@/shared/assets";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Container className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="font-pixel text-[10px] uppercase tracking-widest text-neon-cyan">Донат-магазин</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight text-fg sm:text-5xl">
            Пополните баланс <span className="text-gold">Обрыгаций</span> за пару минут
          </h1>
          <p className="mt-5 max-w-xl text-lg text-muted">
            Обрыгации: внутриигровая валюта сервера. Они тратятся в донат-шопе на темы меню, скины, бустеры и
            дополнительные слоты. Войдите через аккаунт сервера, выберите пакет и оплатите, а валюта придёт на баланс
            автоматически.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href={routes.shop} size="lg">
              Купить Обрыгации
            </ButtonLink>
            <ButtonLink href="#how" variant="secondary" size="lg">
              Как это работает
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-muted">Оплата через {siteConfig.paymentProvider}. Данные карты мы не получаем.</p>
        </div>

        <figure className="rounded-xl border border-line-strong bg-surface p-2 shadow-[0_0_80px_-24px_var(--color-neon-pink)]">
          <Image
            src={donatShopScreen}
            alt="Донат-шоп игрового сервера: темы меню, скины, бустеры и слоты, баланс в Обрыгациях"
            loading="eager"
            fetchPriority="high"
            sizes="(min-width: 768px) 560px, 100vw"
            className="h-auto w-full rounded-lg"
          />
          <figcaption className="px-2 pb-1 pt-3 text-xs text-muted">Донат-шоп внутри игры, где тратятся Обрыгации.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
