import { Container, SectionHeading } from "@/shared/ui";

const steps = [
  {
    title: "Соберите набор",
    text: "Выберите основное и запасное оружие, добавьте обвесы, броню и три перка. Несколько наборов можно хранить и менять прямо в лобби.",
  },
  {
    title: "Найдите матч",
    text: "Встаньте в очередь или создайте собственный матч. Как только наберётся минимум игроков, начнётся обратный отсчёт.",
  },
  {
    title: "Сражайтесь",
    text: "Играйте командой против команды, захватывайте точки или сражайтесь каждый сам за себя. Союзники видят ваши метки.",
  },
  {
    title: "Развивайтесь",
    text: "За матчи вы получаете опыт, монеты и звания, поднимаетесь в рейтинге и тратите монеты на снаряжение и скины.",
  },
] as const;

export function GameLoop() {
  return (
    <section id="how" className="scroll-mt-24">
      <Container className="py-12 md:py-20">
        <SectionHeading title="Как проходит игра" description="От выбора оружия до места в рейтинге: путь игрока в четыре шага." />
        <ol className="mt-10 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <li key={step.title} className="border-t border-line-strong pt-5">
              <span className="font-display text-5xl font-bold leading-none text-accent">{String(index + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-2xl font-semibold uppercase tracking-wide text-white">{step.title}</h3>
              <p className="mt-3 leading-7 text-body">{step.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
