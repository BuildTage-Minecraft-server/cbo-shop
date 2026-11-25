import { partnerProgram } from "@/shared/config";
import { Container, Steps } from "@/shared/ui";
import type { StepItem } from "@/shared/ui";

function daysLabel(count: number): string {
  const lastTwo = count % 100;
  const last = count % 10;
  if (lastTwo >= 11 && lastTwo <= 14) return `${count} дней`;
  if (last === 1) return `${count} день`;
  if (last >= 2 && last <= 4) return `${count} дня`;
  return `${count} дней`;
}

export function PartnerIntro() {
  const { commissionPercent, holdDays, minPayoutRub, attributionDays } = partnerProgram;

  const steps: readonly StepItem[] = [
    {
      title: "Получите ссылку",
      text: "Войдите через аккаунт сервера и выберите короткий код. Личная ссылка появится сразу.",
    },
    {
      title: "Приводите игроков",
      text: `Игрок закрепляется за вами, когда регистрируется, входит или покупает после перехода по ссылке. Переход действует ${daysLabel(attributionDays)}.`,
    },
    {
      title: "Получайте процент",
      text: `${commissionPercent}% с каждой оплаты привлечённого игрока. ${
        holdDays > 0 ? `Начисление становится доступным к выплате через ${daysLabel(holdDays)}.` : "Начисление доступно к выплате сразу."
      }`,
    },
  ];

  const rules = [
    "За игроком остаётся первый партнёр, по чьей ссылке он пришёл. Позже закрепление не меняется.",
    "Покупки с вашего собственного аккаунта не засчитываются.",
    `Выплата от ${minPayoutRub} ₽ по заявке: на карту или по СБП. Заявки обрабатываются вручную.`,
    "Если платёж возвращён, начисление за него может быть аннулировано.",
    "Накрутка через дополнительные аккаунты и самопокупки ведёт к блокировке начислений.",
  ];

  return (
    <section>
      <Container className="py-12 md:py-20">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
            Партнёрская программа
          </h1>
          <p className="mt-6 text-lg leading-8 text-body">
            Для стримеров, видеоблогеров и владельцев сообществ. Приводите игроков на сервер по своей ссылке и получайте
            процент с их покупок игровой валюты.
          </p>
        </div>

        <div className="mt-12">
          <Steps items={steps} />
        </div>

        <div className="mt-14 max-w-3xl">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">Условия</h2>
          <ul className="mt-4 space-y-3 leading-7 text-body">
            {rules.map((rule) => (
              <li key={rule} className="flex gap-3">
                <span aria-hidden="true" className="mt-3 h-1.5 w-1.5 shrink-0 bg-accent" />
                <span>{rule}</span>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
}
