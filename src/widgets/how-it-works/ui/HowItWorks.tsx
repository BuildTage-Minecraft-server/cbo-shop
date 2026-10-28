import { siteConfig } from "@/shared/config";
import { Container, SectionHeading } from "@/shared/ui";

const steps = [
  {
    title: "Войдите через аккаунт сервера",
    text: "Используйте тот же ник и пароль, что и в лаунчере. Проверка выполняется через сервер авторизации Drasl.",
  },
  {
    title: "Выберите пакет",
    text: "Выберите количество Обрыгаций. Цена указана в рублях и фиксируется в момент создания платежа.",
  },
  {
    title: `Оплатите через ${siteConfig.paymentProvider}`,
    text: "Откроется защищённая страница оплаты. Данные банковской карты мы не получаем и не храним.",
  },
  {
    title: "Получите валюту в игре",
    text: "Обрыгации автоматически начисляются на аккаунт, обычно в течение нескольких минут.",
  },
] as const;

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 py-16 md:py-20">
      <Container>
        <SectionHeading kicker="Как это работает" title="Четыре шага до баланса" />
        <ol className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="rounded-xl border border-line bg-surface/70 p-6">
              <span className="font-pixel text-xl text-neon-pink">{index + 1}</span>
              <h3 className="mt-4 font-semibold text-fg">{step.title}</h3>
              <p className="mt-2 text-sm text-muted">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
