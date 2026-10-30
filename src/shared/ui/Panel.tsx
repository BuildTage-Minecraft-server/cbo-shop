import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib";
import type { Accent } from "./accent";

type Bar = "none" | "left" | "right" | "top";

export function Panel({
  as,
  accent = "cyan",
  bar = "none",
  className,
  children,
}: {
  as?: ElementType;
  accent?: Accent;
  bar?: Bar;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "div";

  return (
    <Tag className={cn("hud-panel", `tone-${accent}`, className)} data-bar={bar}>
      {children}
    </Tag>
  );
}
