import { Container, Panel, TitleOrnament } from "@/shared/ui";

export type DocumentSection = {
  title: string;
  clauses: readonly string[];
};

type LegalDocumentProps = {
  title: string;
  updatedAt?: string;
  intro?: string;
  sections: readonly DocumentSection[];
  numbered?: boolean;
};

export function LegalDocument({ title, updatedAt, intro, sections, numbered = true }: LegalDocumentProps) {
  return (
    <Container className="py-12 md:py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{title}</h1>
        <TitleOrnament />
        {updatedAt ? <p className="mt-4 text-sm text-muted">Редакция от {updatedAt}</p> : null}

        <Panel accent="purple" bar="left" className="mt-8 space-y-10 p-6 sm:p-8">
          {intro ? <p className="leading-7 text-body">{intro}</p> : null}

          {sections.map((section, sectionIndex) => (
            <section key={section.title}>
              <h2 className="font-display text-lg font-semibold text-neon-cyan">
                {numbered ? `${sectionIndex + 1}. ${section.title}` : section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.clauses.map((clause, clauseIndex) => (
                  <p key={clause} className="leading-7 text-body">
                    {numbered ? `${sectionIndex + 1}.${clauseIndex + 1}. ${clause}` : clause}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </Panel>
      </article>
    </Container>
  );
}
