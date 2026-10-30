import { cn } from "@/shared/lib";

export function TitleOrnament({ align = "left", className }: { align?: "left" | "center"; className?: string }) {
  return (
    <div aria-hidden="true" className={cn("hud-ornament", align === "center" && "hud-ornament--center", className)}>
      <span className="hud-ornament__node" />
      <span className="hud-ornament__seg" />
      <span className="hud-ornament__node" />
    </div>
  );
}
