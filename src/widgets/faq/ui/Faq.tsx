import { Container, SectionHeading } from "@/shared/ui";
import type { FaqItem } from "../model/questions";

export function Faq({ items, title = "Частые вопросы" }: { items: readonly FaqItem[]; title?: string }) {
  return (
    <section className="border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title={title} />
        <div className="mt-8 max-w-3xl divide-y divide-line border-y border-line">
          {items.map((item) => (
            <details key={item.question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="font-display text-3xl font-normal leading-none text-accent transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl leading-7 text-body">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
