import { cn } from "@/shared/lib";
import { ButtonLink, Container, MediaSlot } from "@/shared/ui";
import { gameSections } from "../model/sections";

export function GameSections() {
  return (
    <div>
      {gameSections.map((section, index) => (
        <section key={section.id} id={section.id} className="scroll-mt-24 border-t border-line">
          <Container className="grid items-start gap-8 py-12 md:grid-cols-2 md:gap-14 md:py-16">
            <div className={cn(index % 2 === 1 && "md:order-last")}>
              <MediaSlot src={section.media.src} alt={section.media.label} label={section.media.label} />
            </div>
            <div>
              <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white">{section.title}</h2>
              <p className="mt-4 text-lg leading-8 text-body">{section.lead}</p>
              {section.points ? (
                <ul className="mt-5 space-y-3">
                  {section.points.map((point) => (
                    <li key={point} className="flex gap-3 leading-7 text-body">
                      <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.chips ? (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {section.chips.map((chip) => (
                    <li key={chip} className="border border-line-strong bg-surface px-3 py-1.5 text-sm text-body">
                      {chip}
                    </li>
                  ))}
                </ul>
              ) : null}
              {section.action ? (
                <div className="mt-7">
                  <ButtonLink href={section.action.href} variant="secondary" icon="cart">
                    {section.action.label}
                  </ButtonLink>
                </div>
              ) : null}
            </div>
          </Container>
        </section>
      ))}
    </div>
  );
}
