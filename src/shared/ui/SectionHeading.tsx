import { cn } from "@/shared/lib";

export function SectionHeading({
  title,
  description,
  className,
}: {
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <header className={cn("max-w-2xl", className)}>
      <h2 className="font-display text-4xl font-bold uppercase leading-tight tracking-wide text-white sm:text-5xl">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 text-body">{description}</p> : null}
    </header>
  );
}
