import Link from "next/link";
import { routes } from "@/shared/config";
import { Container, Panel, PixelIcon, SectionHeading } from "@/shared/ui";

const rules = [
  "Лимит убийств или очков",
  "Разминка",
  "Задержка возрождения",
  "Защита после появления",
  "Огонь по своим",
  "Вход после начала матча",
  "Перезарядка гранат",
  "Метки команды",
  "Наблюдатели",
] as const;

export function CustomPlay() {
  return (
    <section id="custom" className="scroll-mt-24 border-t border-line">
      <Container className="py-12 md:py-20">
        <SectionHeading
          title="Играйте по своим правилам"
          description="Сервер предлагает не только готовые матчи, но и инструменты, чтобы создавать собственные."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Panel as="article" accent="blue" className="p-6">
            <PixelIcon name="plus" scale={3} className="tone-text" />
            <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide text-white">Свой матч</h3>
            <p className="mt-3 leading-7 text-body">
              Выберите режим, карту, число игроков и длительность, а затем настройте правила под свою компанию.
            </p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {rules.map((rule) => (
                <li key={rule} className="border border-line-strong bg-ink/60 px-3 py-1.5 text-sm text-body">
                  {rule}
                </li>
              ))}
            </ul>
            <Link href={`${routes.game}#custom-match`} className="mt-6 inline-block font-semibold text-accent underline-offset-4 hover:underline">
              Подробнее о настройках
            </Link>
          </Panel>

          <Panel as="article" accent="orange" className="p-6">
            <PixelIcon name="grid" scale={3} className="tone-text" />
            <h3 className="mt-4 font-display text-3xl font-semibold uppercase tracking-wide text-white">Редактор карт</h3>
            <p className="mt-3 leading-7 text-body">
              Выделите постройку в мире и сохраните её как карту, а затем расставьте точки появления красных и синих, точки
              захвата и хаб.
            </p>
            <ul className="mt-5 space-y-3">
              {[
                "Предпросмотр «глазами игрока» и срез по высоте помогают работать с многоэтажными постройками.",
                "Новые карты создаются без программирования.",
              ].map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-6 text-body">
                  <span aria-hidden="true" className="mt-2 h-2 w-2 shrink-0 bg-accent" />
                  {point}
                </li>
              ))}
            </ul>
            <Link href={`${routes.game}#maps`} className="mt-6 inline-block font-semibold text-accent underline-offset-4 hover:underline">
              Подробнее о редакторе
            </Link>
          </Panel>
        </div>
      </Container>
    </section>
  );
}
