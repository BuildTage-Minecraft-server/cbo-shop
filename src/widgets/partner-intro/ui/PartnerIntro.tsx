import { partnerProgram } from "@/shared/config";
import { Container, Panel, Steps } from "@/shared/ui";
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
  const { holdDays, attributionDays } = partnerProgram;

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
      text: `Процент с каждой оплаты привлечённого игрока.${
        holdDays > 0 ? ` Начисление становится доступным к выплате через ${daysLabel(holdDays)}.` : ""
      }`,
    },
  ];

  const rules = [
    {
      title: "Закрепление",
      text: "Игрок остаётся у первого партнёра, по чьей ссылке он пришёл.",
    },
    {
      title: "Выплаты",
      text: "По заявке, на карту или по СБП. Обрабатываем вручную.",
    },
    {
      title: "Возвраты",
      text: "Если платёж возвращён, начисление за него отменяется.",
    },
    {
      title: "Честная игра",
      text: "Покупки с вашего аккаунта и дополнительных аккаунтов не засчитываются.",
    },
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

        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">Условия</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rules.map((rule) => (
              <Panel key={rule.title} className="p-5">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-white">{rule.title}</h3>
                <p className="mt-2 text-sm leading-6 text-body">{rule.text}</p>
              </Panel>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
