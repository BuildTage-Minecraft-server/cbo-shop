import { CurrencyIcon } from "@/entities/currency-pack";
import { getPaymentOutcome } from "@/features/check-payment-status";
import { routes } from "@/shared/config";
import { ButtonLink, Container, Panel } from "@/shared/ui";
import { outcomeViews } from "../model/views";

export async function PaymentResultPage() {
  const view = outcomeViews[await getPaymentOutcome()];

  return (
    <Container className="py-14 md:py-24">
      <div className="mx-auto max-w-xl">
        <Panel accent={view.accent} className="p-8 text-center">
          {view.mark ? (
            <span className="tone-text mx-auto grid h-14 w-14 place-items-center border border-line-strong font-display text-3xl font-bold">
              {view.mark}
            </span>
          ) : (
            <CurrencyIcon className="mx-auto h-14 w-14" />
          )}
          <h1 className="mt-6 font-display text-3xl font-bold uppercase leading-tight tracking-wide text-white sm:text-4xl">
            {view.title}
          </h1>
          <p className="mt-4 leading-7 text-body">{view.text}</p>
          <p className="mt-3 text-sm text-muted">{view.note}</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <ButtonLink href={routes.shop} icon="cart">
              В магазин
            </ButtonLink>
            <ButtonLink href={routes.contacts} variant="secondary">
              Поддержка
            </ButtonLink>
          </div>
        </Panel>
      </div>
    </Container>
  );
}
