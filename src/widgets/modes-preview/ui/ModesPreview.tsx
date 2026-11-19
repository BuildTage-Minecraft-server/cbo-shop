import { routes } from "@/shared/config";
import { ButtonLink, Container, Panel, PixelIcon, SectionHeading } from "@/shared/ui";
import { MediaSlot } from "@/shared/ui/MediaSlot";
import type { Accent, IconName } from "@/shared/ui";

type Mode = {
  slot: string;
  title: string;
  tag: string;
  text: string;
  points: readonly string[];
  icon: IconName;
  accent: Accent;
};

const modes: readonly Mode[] = [
  {
    slot: "modes/team",
    title: "Командный бой",
    tag: "Команда на команду",
    text: "Красные против синих. Команда видит друг друга и общие метки, поэтому играть вместе проще.",
    points: ["Метки команды и контуры союзников", "Пинги видны всей команде", "Свой набор карт"],
    icon: "user",
    accent: "red",
  },
  {
    slot: "modes/capture",
    title: "Захват точек",
    tag: "Контроль карты",
    text: "Захватывайте точки и не отдавайте их врагу. Прогресс всегда на виду.",
    points: [
      "Прогресс-бар и стрелка показывают, кто захватывает точку",
      "Над точкой буква-метка",
      "Если на точке никого нет, захват постепенно спадает",
    ],
    icon: "target",
    accent: "yellow",
  },
  {
    slot: "modes/ffa",
    title: "Все против всех",
    tag: "Каждый за себя",
    text: "Здесь нет союзников: каждый играет сам за себя.",
    points: ["Враг каждый, кроме вас", "Для режима есть свой набор карт"],
    icon: "bolt",
    accent: "green",
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
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {modes.map((mode) => (
            <Panel key={mode.title} as="article" accent={mode.accent} className="flex flex-col p-6">
              <MediaSlot
                slot={mode.slot}
                alt={`Режим «${mode.title}»`}
                label={mode.title}
                whenMissing="hide"
                glow={false}
                sizes="(min-width: 768px) 360px, 100vw"
                className="-mx-6 -mt-6 mb-6 w-[calc(100%+3rem)] max-w-none border-0 border-b"
              />
              <div className="flex h-7 items-center gap-3">
                <PixelIcon name={mode.icon} scale={3} className="tone-text" />
                <span className="font-display text-sm uppercase tracking-[0.14em] text-muted">{mode.tag}</span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide text-white">{mode.title}</h3>
              <p className="mt-3 leading-7 text-body">{mode.text}</p>
              <ul className="mt-5 space-y-2 border-t border-line pt-5">
                {mode.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm leading-6 text-body">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            </Panel>
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
