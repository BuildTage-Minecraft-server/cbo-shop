import Image from "next/image";
import type { StaticImageData } from "next/image";
import { cn } from "@/shared/lib";
import { PixelIcon } from "./PixelIcon";

export function MediaSlot({
  src,
  alt,
  label,
  sizes = "(min-width: 1024px) 560px, 100vw",
  className,
}: {
  src?: StaticImageData;
  alt: string;
  label: string;
  sizes?: string;
  className?: string;
}) {
  if (src) {
    return <Image src={src} alt={alt} sizes={sizes} className={cn("block h-auto w-full border border-line-strong", className)} />;
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(
        "media-placeholder flex aspect-video w-full flex-col items-center justify-center gap-3 border border-dashed border-line-strong bg-surface",
        className,
      )}
    >
      <PixelIcon name="target" scale={3} className="text-line-strong" />
      <span className="px-4 text-center font-display text-lg uppercase tracking-wider text-muted">{label}</span>
    </div>
  );
}
