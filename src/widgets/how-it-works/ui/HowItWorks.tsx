import { siteConfig } from "@/shared/config";
import { Container, SectionHeading, Steps } from "@/shared/ui";
import type { StepItem } from "@/shared/ui";

const steps: readonly StepItem[] = [
  {
    title: "Войдите через аккаунт",
    text: "Используйте тот же ник и пароль, что и в лаунчере. Проверка выполняется через сервер авторизации Drasl.",
  },
  {
    title: "Выберите пакет",
    text: "Выберите количество валюты. Цена указана в рублях и фиксируется в момент создания платежа.",
  },
  {
    title: `Оплатите через ${siteConfig.paymentProvider}`,
    text: "Откроется защищённая страница оплаты. Данные банковской карты мы не получаем и не храним.",
  },
  {
    title: "Получите валюту в игре",
    text: "Валюта автоматически начисляется на аккаунт, обычно в течение нескольких минут.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Как это работает" />
        <div className="mt-10">
          <Steps items={steps} columns={4} />
        </div>
      </Container>
    </section>
  );
}
