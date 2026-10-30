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
      {kicker ? <p className="font-pixel text-base uppercase tracking-widest text-neon-cyan">{kicker}</p> : null}
      <h2 className="pixel-shadow mt-2 font-pixel text-[32px] uppercase leading-tight text-white">{title}</h2>
      <TitleOrnament align={align} />
      {description ? <p className="mt-4 text-base text-body sm:text-lg">{description}</p> : null}
    </header>
  );
}
