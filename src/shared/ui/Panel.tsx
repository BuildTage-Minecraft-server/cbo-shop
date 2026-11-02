import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib";
import type { Accent } from "./accent";

export function Panel({
  as,
  accent,
  highlight = false,
  className,
  children,
}: {
  as?: ElementType;
  accent?: Accent;
  highlight?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? "div";

  return (
    <Tag className={cn("card", accent && `tone-${accent} card--accent`, highlight && "card--gold", className)}>
      {children}
    </Tag>
  );
}
