import Image from "next/image";
import { donatShopScreen } from "@/shared/assets";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container, Frame, TitleOrnament } from "@/shared/ui";

export function Hero() {
  return (
    <section className="relative">
      <Container className="grid items-center gap-12 py-14 md:grid-cols-2 md:py-20">
        <div>
          <p className="font-pixel text-base uppercase tracking-widest text-neon-cyan">Магазин игровой валюты</p>
          <h1 className="pixel-shadow mt-3 font-pixel text-[32px] uppercase leading-[1.15] text-white sm:text-5xl">
            Пополните игровой баланс на сервере <span className="text-gold">{siteConfig.name}</span>
          </h1>
          <TitleOrnament />
          <p className="mt-6 max-w-xl text-lg text-body">
            Внутриигровая валюта тратится в донат-шопе на темы меню, скины, бустеры и дополнительные слоты. Войдите через
            аккаунт сервера, выберите пакет и оплатите: валюта автоматически поступит на баланс.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ButtonLink href={routes.shop} size="lg" icon="cart">
              Купить валюту
            </ButtonLink>
            <ButtonLink href="#how" variant="secondary" size="lg" icon="list">
              Как это работает
            </ButtonLink>
          </div>
          <p className="mt-6 text-xs text-muted">
            Оплата через {siteConfig.paymentProvider}. Данные банковской карты мы не получаем.
          </p>
        </div>

        <figure>
          <Frame>
            <Image
              src={donatShopScreen}
              alt={`Донат-шоп игры ${siteConfig.name}: темы меню, скины, бустеры и слоты, баланс игровой валюты`}
              loading="eager"
              fetchPriority="high"
              sizes="(min-width: 768px) 560px, 100vw"
              className="block h-auto w-full border border-line-strong"
            />
          </Frame>
          <figcaption className="mt-3 font-pixel text-base text-muted">Донат-шоп внутри игры.</figcaption>
        </figure>
      </Container>
    </section>
  );
}
