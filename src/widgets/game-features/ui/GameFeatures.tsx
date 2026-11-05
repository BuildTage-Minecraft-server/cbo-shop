import { Container } from "@/shared/ui";

const stats = [
  { value: "3", label: "режима: командный бой, захват точек и все против всех" },
  { value: "100", label: "уровней прогрессии" },
  { value: "21", label: "звание, от «Новобранца» до «Легенды»" },
  { value: "600+", label: "скинов оружия в коллекции" },
] as const;

export function GameFeatures() {
  return (
    <section id="features" className="scroll-mt-24 border-y border-line bg-surface/50">
      <Container className="py-10">
        <dl className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="border-l-2 border-accent pl-5">
              <dt className="font-display text-5xl font-bold leading-none text-white">{stat.value}</dt>
              <dd className="mt-2 text-sm leading-5 text-body">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
