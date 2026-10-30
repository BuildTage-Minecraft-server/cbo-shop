import { CurrencyIcon } from "@/entities/currency-pack";
import { routes, seller } from "@/shared/config";
import { ButtonLink, Container, Frame, Panel } from "@/shared/ui";

export function PaymentResultPage() {
  return (
    <Container className="py-14 md:py-24">
      <div className="mx-auto max-w-xl">
        <Frame accent="yellow">
          <Panel accent="yellow" bar="top" className="p-8 text-center">
            <CurrencyIcon className="mx-auto h-14 w-14" />
            <h1 className="pixel-shadow mt-6 font-pixel text-[32px] uppercase leading-tight text-white">Спасибо за покупку</h1>
            <p className="mt-4 text-body">
              Если оплата прошла успешно, валюта появится на балансе в течение нескольких минут. Проверить баланс можно в
              донатном магазине внутри игры.
            </p>
            <p className="mt-3 text-sm text-muted">Если за 24 часа ничего не пришло, напишите на {seller.email}.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <ButtonLink href={routes.shop} icon="cart">
                В магазин
              </ButtonLink>
              <ButtonLink href={routes.contacts} variant="secondary">
                Поддержка
              </ButtonLink>
            </div>
          </Panel>
        </Frame>
      </div>
    </Container>
  );
}
