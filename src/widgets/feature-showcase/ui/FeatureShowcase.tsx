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
  chips?: { caption: string; items: readonly string[] };
  mediaLabel: string;
  linkLabel: string;
};

const features: readonly Feature[] = [
  {
    id: "loadout",
    tag: "Снаряжение",
    title: "Оружие, которое вы собираете сами",
    lead: "У каждого игрока свой набор: основное и запасное оружие, оружие ближнего боя, граната, четыре предмета брони и три перка.",
    points: [
      "Обвесы: прицелы, дульные устройства, приклады, рукояти, лазерные целеуказатели и увеличенные магазины.",
      "Готовую сборку можно сохранить и отправить другу в виде кода.",
      "Несколько наборов: один для штурма, другой для боя на дальней дистанции. Менять их можно в лобби.",
      "Перки меняют характеристики: скорость, стойкость, регенерацию. Эффекты за убийства накапливаются в серии.",
    ],
    mediaLabel: "Скриншот: экран снаряжения",
    linkLabel: "Всё о снаряжении",
  },
  {
    id: "progress",
    tag: "Развитие",
    title: "Опыт, звания и рейтинги",
    lead: "Опыт начисляется за убийства, попадания в голову, помощь союзникам, сыгранные матчи и победы. За каждый новый уровень вы получаете монеты.",
    points: [
      "100 уровней и 21 звание, от «Новобранца» до «Легенды».",
      "Ежедневные и еженедельные задания с наградой.",
      "Рейтинги за неделю и за месяц по убийствам, K/D и проценту побед.",
      "Победители получают титул чемпиона, опыт, монеты и донат-валюту. Награды есть и за второе, и за третье места.",
    ],
    chips: {
      caption: "Примеры титулов",
      items: ["«Снайпер»: 100 попаданий в голову", "«Палач»: 500 убийств", "«Ветеран»: 100 матчей", "«Пинг 999»"],
    },
    mediaLabel: "Скриншот: профиль и звания",
    linkLabel: "Подробнее о развитии",
  },
  {
    id: "replays",
    tag: "Реплеи",
    title: "Любой матч можно пересмотреть",
    lead: "Каждый матч записывается от лица каждого игрока, поэтому его можно посмотреть глазами любого участника.",
    points: [
      "Доступны пауза, перемотка и свободная камера.",
      "Воспроизводятся трассеры, звуки выстрелов и эффекты.",
      "Лучшие матчи сервер сам превращает в видео формата MP4.",
    ],
    mediaLabel: "Видео: реплей матча",
    linkLabel: "Подробнее о реплеях",
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
              {feature.chips ? (
                <div className="mt-6">
                  <p className="text-xs uppercase tracking-wider text-muted">{feature.chips.caption}</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {feature.chips.items.map((chip) => (
                      <li key={chip} className="border border-line-strong bg-surface px-3 py-1.5 text-sm text-body">
                        {chip}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
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
