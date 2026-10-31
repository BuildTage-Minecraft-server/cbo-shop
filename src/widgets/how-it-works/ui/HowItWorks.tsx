import { siteConfig } from "@/shared/config";
import { Container, Panel, SectionHeading } from "@/shared/ui";
import type { Accent } from "@/shared/ui";

const steps: ReadonlyArray<{ title: string; text: string; accent: Accent }> = [
  {
    title: "Войдите через аккаунт",
    text: "Используйте тот же ник и пароль, что и в лаунчере. Проверка выполняется через сервер авторизации Drasl.",
    accent: "blue",
  },
  {
    title: "Выберите пакет",
    text: "Выберите количество валюты. Цена указана в рублях и фиксируется в момент создания платежа.",
    accent: "purple",
  },
  {
    title: `Оплатите через ${siteConfig.paymentProvider}`,
    text: "Откроется защищённая страница оплаты. Данные банковской карты мы не получаем и не храним.",
    accent: "yellow",
  },
  {
    title: "Получите валюту в игре",
    text: "Валюта автоматически начисляется на аккаунт, обычно в течение нескольких минут.",
    accent: "green",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <SectionHeading kicker="Как это работает" title="Четыре шага до баланса" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Panel key={step.title} as="li" accent={step.accent} bar="top" className="p-5">
              <span className="hud-icon-box">{index + 1}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-white">{step.title}</h3>
              <p className="mt-2 text-sm text-body">{step.text}</p>
            </Panel>
          ))}
        </ol>
      </Container>
    </section>
  );
}
