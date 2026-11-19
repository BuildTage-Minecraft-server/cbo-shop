import { routes } from "@/shared/config";
import { ButtonLink, Container, Panel, PixelIcon, SectionHeading } from "@/shared/ui";
import type { Accent, IconName } from "@/shared/ui";
import { MediaSlot } from "@/shared/ui/MediaSlot";

type Mode = {
  slot: string;
  title: string;
  tag: string;
  text: string;
  icon: IconName;
  accent: Accent;
};

const modes: readonly Mode[] = [
  {
    slot: "modes/team",
    title: "Командный бой",
    tag: "Команда на команду",
    text: "Красные против синих. Метки и контуры союзников помогают играть слаженно.",
    icon: "user",
    accent: "red",
  },
  {
    slot: "modes/capture",
    title: "Захват точек",
    tag: "Контроль карты",
    text: "Захватывайте точки и не отдавайте их врагу.",
    icon: "target",
    accent: "yellow",
  },
  {
    slot: "modes/ffa",
    title: "Все против всех",
    tag: "Каждый сам за себя",
    text: "Каждый сам за себя. Союзников нет.",
    icon: "bolt",
    accent: "green",
  },
];

export function ModesPreview() {
  return (
    <section id="modes" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Три режима" />
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {modes.map((mode) => (
            <Panel key={mode.title} as="article" accent={mode.accent} className="flex flex-col p-6">
              <MediaSlot
                slot={mode.slot}
                alt={`Режим «${mode.title}»`}
                label={`Скриншот: ${mode.title.toLowerCase()}`}
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
            </Panel>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href={routes.game} variant="secondary" size="lg">
            Всё об игре
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
