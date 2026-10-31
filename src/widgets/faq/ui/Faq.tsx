import { Container, Panel, PixelIcon, SectionHeading } from "@/shared/ui";
import { faqItems } from "../model/questions";

export function Faq() {
  return (
    <section className="py-16 md:py-20">
      <Container>
        <SectionHeading kicker="FAQ" title="Частые вопросы" />
        <div className="mt-10 grid gap-4 lg:max-w-3xl">
          {faqItems.map((item) => (
            <Panel key={item.question} as="details" accent="purple" bar="left" className="group px-5 py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-base font-semibold text-white [&::-webkit-details-marker]:hidden">
                {item.question}
                <span aria-hidden="true" className="hud-icon-box h-8 w-8 transition group-open:rotate-45">
                  <PixelIcon name="plus" />
                </span>
              </summary>
              <p className="mt-3 text-sm leading-6 text-body">{item.answer}</p>
            </Panel>
          ))}
        </div>
      </Container>
    </section>
  );
}
