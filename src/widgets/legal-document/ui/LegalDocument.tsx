import { Container } from "@/shared/ui";

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
    <Container className="py-14 md:py-20">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold text-fg sm:text-4xl">{title}</h1>
        {updatedAt ? <p className="mt-2 text-sm text-muted">Редакция от {updatedAt}</p> : null}
        {intro ? <p className="mt-6 leading-7 text-muted">{intro}</p> : null}

        <div className="mt-10 space-y-10">
          {sections.map((section, sectionIndex) => (
            <section key={section.title}>
              <h2 className="text-xl font-semibold text-fg">
                {numbered ? `${sectionIndex + 1}. ${section.title}` : section.title}
              </h2>
              <div className="mt-3 space-y-3">
                {section.clauses.map((clause, clauseIndex) => (
                  <p key={clause} className="leading-7 text-muted">
                    {numbered ? `${sectionIndex + 1}.${clauseIndex + 1}. ${clause}` : clause}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </Container>
  );
}
