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
    <Container className="py-12 md:py-16">
      <article className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">{title}</h1>
        {updatedAt ? <p className="mt-3 text-sm text-muted">Редакция от {updatedAt}</p> : null}
        {intro ? <p className="mt-6 text-lg leading-8 text-body">{intro}</p> : null}

        <div className="mt-10 space-y-10">
          {sections.map((section, sectionIndex) => (
            <section key={section.title} className="border-t border-line pt-6">
              <h2 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">
                {numbered ? `${sectionIndex + 1}. ${section.title}` : section.title}
              </h2>
              <div className="mt-4 space-y-3">
                {section.clauses.map((clause, clauseIndex) => (
                  <p key={clause} className="leading-7 text-body">
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
