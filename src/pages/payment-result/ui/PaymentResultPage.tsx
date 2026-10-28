import { CurrencyIcon } from "@/entities/currency-pack";
import { routes, siteConfig } from "@/shared/config";
import { ButtonLink, Container } from "@/shared/ui";

export function PaymentResultPage() {
  return (
    <Container className="py-16 md:py-24">
      <div className="mx-auto max-w-xl rounded-xl border border-line-strong bg-surface/80 p-8 text-center">
        <CurrencyIcon className="mx-auto h-14 w-14" />
        <h1 className="mt-6 text-3xl font-bold text-fg">Спасибо за покупку</h1>
        <p className="mt-4 text-muted">
          Если оплата прошла успешно, Обрыгации появятся на балансе в течение нескольких минут. Проверить баланс можно в
          донатном магазине внутри игры.
        </p>
        <p className="mt-3 text-sm text-muted">
          Если за 24 часа ничего не пришло, напишите на {siteConfig.seller.email}.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <ButtonLink href={routes.shop}>В магазин</ButtonLink>
          <ButtonLink href={routes.contacts} variant="secondary">
            Связаться с поддержкой
          </ButtonLink>
        </div>
      </div>
    </Container>
  );
}
