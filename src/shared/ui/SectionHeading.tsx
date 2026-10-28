import { cn } from "@/shared/lib";

export function SectionHeading({
  kicker,
  title,
  description,
  className,
}: {
  kicker?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      {kicker ? <p className="font-pixel text-[10px] uppercase tracking-widest text-neon-cyan">{kicker}</p> : null}
      <h2 className="mt-3 text-3xl font-bold leading-tight text-fg sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 text-base text-muted sm:text-lg">{description}</p> : null}
    </header>
  );
}
