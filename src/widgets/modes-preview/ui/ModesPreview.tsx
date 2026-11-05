import type { StaticImageData } from "next/image";
import { routes } from "@/shared/config";
import { ButtonLink, Container, MediaSlot, SectionHeading } from "@/shared/ui";

const modes: ReadonlyArray<{ title: string; text: string; label: string; src?: StaticImageData }> = [
  {
    title: "Командный бой",
    text: "Красные против синих. Метки команды, общие пинги и контуры союзников помогают играть вместе.",
    label: "Скриншот: командный бой",
  },
  {
    title: "Захват точек",
    text: "Прогресс-бар и стрелка показывают, кто захватывает точку. Если на точке никого нет, захват постепенно спадает.",
    label: "Скриншот: захват точки",
  },
  {
    title: "Все против всех",
    text: "Каждый играет сам за себя. Для каждого режима есть свой набор карт.",
    label: "Скриншот: все против всех",
  },
];

export function ModesPreview() {
  return (
    <section id="modes" className="scroll-mt-24">
      <Container className="py-12 md:py-20">
        <SectionHeading
          title="Три режима"
          description="Нажимаете «Найти матч» и встаёте в очередь. Матч стартует с обратным отсчётом, как только набирается минимум игроков."
        />
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {modes.map((mode) => (
            <article key={mode.title}>
              <MediaSlot src={mode.src} alt={mode.label} label={mode.label} sizes="(min-width: 768px) 360px, 100vw" />
              <h3 className="mt-5 font-display text-2xl font-semibold uppercase tracking-wide text-white">{mode.title}</h3>
              <p className="mt-2 leading-7 text-body">{mode.text}</p>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href={routes.game} variant="secondary" size="lg">
            Об игре подробнее
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
