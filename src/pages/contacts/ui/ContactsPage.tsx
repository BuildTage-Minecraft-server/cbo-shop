import type { ReactNode } from "react";
import { siteConfig } from "@/shared/config";
import { Container } from "@/shared/ui";

export function ContactsPage() {
  const { seller } = siteConfig;

  const rows: ReadonlyArray<{ label: string; value: ReactNode }> = [
    { label: "Исполнитель", value: seller.fullName },
    { label: "Статус", value: seller.status },
    { label: "ИНН", value: seller.inn },
    {
      label: "Электронная почта",
      value: (
        <a href={`mailto:${seller.email}`} className="text-neon-cyan underline underline-offset-4">
          {seller.email}
        </a>
      ),
    },
    { label: "Телефон", value: seller.phone },
    { label: "Поддержка", value: seller.supportHours },
  ];

  return (
    <Container className="py-14 md:py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-fg sm:text-4xl">Контакты и реквизиты</h1>
        <p className="mt-4 leading-7 text-muted">
          По вопросам оплаты, начисления Обрыгаций и возвратов пишите на электронную почту. В обращении укажите ник,
          дату, время и сумму платежа, так ответ будет быстрее.
        </p>

        <dl className="mt-10 divide-y divide-line rounded-xl border border-line bg-surface/70">
          {rows.map((row) => (
            <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4">
              <dt className="text-sm text-muted">{row.label}</dt>
              <dd className="text-fg">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Container>
  );
}
