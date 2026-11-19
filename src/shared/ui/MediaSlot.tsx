import Image from "next/image";
import { cn } from "@/shared/lib";
import { findScreen } from "@/shared/lib/screens";
import { PixelIcon } from "./PixelIcon";

type Props = {
  slot: string;
  alt: string;
  label: string;
  sizes?: string;
  ratio?: string;
  priority?: boolean;
  glow?: boolean;
  className?: string;
};

const isDev = process.env.NODE_ENV === "development";

export async function MediaSlot({
  slot,
  alt,
  label,
  sizes = "(min-width: 1024px) 560px, 100vw",
  ratio = "aspect-video",
  priority = false,
  glow = true,
  className,
}: Props) {
  const src = await findScreen(slot);

  if (src) {
    return (
      <div className={cn(glow && "frame-glow", "relative overflow-hidden border border-line-strong bg-surface", ratio, className)}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        glow && "frame-glow",
        "relative flex flex-col items-center justify-center gap-3 overflow-hidden border border-dashed border-line-strong bg-gradient-to-br from-surface-2 to-ink",
        ratio,
        className,
      )}
    >
      <PixelIcon name="target" scale={3} className="text-line-strong" />
      <span className="px-4 text-center font-display text-lg uppercase tracking-wider text-muted">{label}</span>
      {isDev ? <code className="px-4 text-center text-xs text-accent">public/screens/{slot}.webp</code> : null}
    </div>
  );
}
