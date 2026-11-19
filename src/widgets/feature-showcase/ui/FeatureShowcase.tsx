import Link from "next/link";
import { routes } from "@/shared/config";
import { cn } from "@/shared/lib";
import { Container } from "@/shared/ui";
import { MediaSlot } from "@/shared/ui/MediaSlot";

type Feature = {
  id: string;
  tag: string;
  title: string;
  lead: string;
  points: readonly string[];
  mediaLabel: string;
  linkLabel: string;
};

const features: readonly Feature[] = [
  {
    id: "loadout",
    tag: "Снаряжение",
    title: "Соберите своё оружие",
    lead: "Основное и запасное оружие, ближний бой, граната, броня и три перка.",
    points: ["Прицелы, рукояти и другие обвесы", "Сборку можно отправить другу кодом", "Несколько наборов, менять их можно в лобби"],
    mediaLabel: "Скриншот: экран снаряжения",
    linkLabel: "Подробнее",
  },
  {
    id: "progress",
    tag: "Развитие",
    title: "Опыт, звания и рейтинги",
    lead: "100 уровней и 21 звание, от «Новобранца» до «Легенды».",
    points: ["Ежедневные и еженедельные задания", "Рейтинги за неделю и месяц с призами", "Титулы за достижения"],
    mediaLabel: "Скриншот: профиль и звания",
    linkLabel: "Подробнее",
  },
];

export function FeatureShowcase() {
  return (
    <>
      {features.map((feature, index) => (
        <section key={feature.id} id={feature.id} className="scroll-mt-24 border-t border-line">
          <Container className="grid items-center gap-10 py-12 md:grid-cols-2 md:gap-16 md:py-20">
            <div className={cn(index % 2 === 1 && "md:order-last")}>
              <MediaSlot slot={`features/${feature.id}`} alt={feature.mediaLabel} label={feature.mediaLabel} />
            </div>
            <div>
              <p className="font-display text-sm uppercase tracking-[0.18em] text-accent">{feature.tag}</p>
              <h2 className="mt-3 font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">
                {feature.title}
              </h2>
              <p className="mt-5 text-lg leading-8 text-body">{feature.lead}</p>
              <ul className="mt-5 space-y-3">
                {feature.points.map((point) => (
                  <li key={point} className="flex gap-3 leading-7 text-body">
                    <span aria-hidden="true" className="mt-2.5 h-2 w-2 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
              <Link href={`${routes.game}#${feature.id}`} className="mt-7 inline-block font-semibold text-accent underline-offset-4 hover:underline">
                {feature.linkLabel}
              </Link>
            </div>
          </Container>
        </section>
      ))}
    </>
  );
}
