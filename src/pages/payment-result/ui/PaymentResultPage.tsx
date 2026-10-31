import { CurrencyIcon } from "@/entities/currency-pack";
import { getPaymentOutcome } from "@/features/check-payment-status";
import { routes } from "@/shared/config";
import { ButtonLink, Container, Frame, Panel } from "@/shared/ui";
import { outcomeViews } from "../model/views";

export async function PaymentResultPage() {
  const view = outcomeViews[await getPaymentOutcome()];

  return (
    <Container className="py-14 md:py-24">
      <div className="mx-auto max-w-xl">
        <Frame accent={view.accent}>
          <Panel accent={view.accent} bar="top" className="p-8 text-center">
            {view.mark ? (
              <span className="hud-icon-box mx-auto grid h-14 w-14 text-2xl">{view.mark}</span>
            ) : (
              <CurrencyIcon className="mx-auto h-14 w-14" />
            )}
            <h1 className="mt-6 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{view.title}</h1>
            <p className="mt-4 text-body">{view.text}</p>
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
        </Frame>
      </div>
    </Container>
  );
}
