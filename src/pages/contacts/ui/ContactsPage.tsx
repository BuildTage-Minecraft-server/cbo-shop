import type { ReactNode } from "react";
import { seller } from "@/shared/config";
import { Container, Panel, TitleOrnament } from "@/shared/ui";

export function ContactsPage() {
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
    <Container className="py-12 md:py-16">
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">Контакты и реквизиты</h1>
        <TitleOrnament />
        <p className="mt-6 leading-7 text-body">
          По вопросам оплаты, начисления игровой валюты и возвратов пишите на электронную почту. В обращении укажите ник,
          дату, время и сумму платежа, так ответ будет быстрее.
        </p>

        <Panel accent="orange" bar="left" className="mt-8">
          <dl className="divide-y divide-line">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4">
                <dt className="font-display text-base font-medium text-muted">{row.label}</dt>
                <dd className="text-white">{row.value}</dd>
              </div>
            ))}
          </dl>
        </Panel>
      </div>
    </Container>
  );
}
