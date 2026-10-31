import { cn } from "@/shared/lib";
import { TitleOrnament } from "./TitleOrnament";

export function SectionHeading({
  kicker,
  title,
  description,
  align = "left",
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {kicker ? <p className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-neon-cyan">{kicker}</p> : null}
      <h2 className="mt-2 font-display text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">{title}</h2>
      <TitleOrnament align={align} />
      {description ? <p className="mt-4 text-base text-body sm:text-lg">{description}</p> : null}
    </header>
  );
}
