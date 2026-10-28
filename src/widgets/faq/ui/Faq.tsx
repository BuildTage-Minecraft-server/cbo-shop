import { Container, SectionHeading } from "@/shared/ui";
import { faqItems } from "../model/questions";

export function Faq() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading kicker="FAQ" title="Частые вопросы" />
        <div className="mt-10 grid gap-3 lg:max-w-3xl">
          {faqItems.map((item) => (
            <details key={item.question} className="group rounded-xl border border-line bg-surface/70 px-5 py-4 open:border-line-strong">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-fg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="text-xl text-neon-cyan transition group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
