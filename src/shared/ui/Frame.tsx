import type { ReactNode } from "react";
import { cn } from "@/shared/lib";
import type { Accent } from "./accent";

export function Frame({ accent, className, children }: { accent?: Accent; className?: string; children: ReactNode }) {
  return <div className={cn("hud-frame", accent && `tone-${accent}`, className)}>{children}</div>;
}
