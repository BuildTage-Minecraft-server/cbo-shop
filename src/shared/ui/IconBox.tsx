import { cn } from "@/shared/lib";
import type { Accent } from "./accent";
import { PixelIcon } from "./PixelIcon";
import type { IconName } from "./PixelIcon";

export function IconBox({
  icon,
  accent,
  scale = 2,
  className,
}: {
  icon: IconName;
  accent?: Accent;
  scale?: number;
  className?: string;
}) {
  return (
    <span className={cn("hud-icon-box", accent && `tone-${accent}`, className)}>
      <PixelIcon name={icon} scale={scale} />
    </span>
  );
}
