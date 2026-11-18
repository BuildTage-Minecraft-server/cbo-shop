import Image from "next/image";
import { logoImage } from "@/shared/assets";
import { cn } from "@/shared/lib";

export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <Image src={logoImage} alt="" width={40} height={40} className="size-10 shrink-0" />
      <span className="font-display text-3xl font-bold leading-none tracking-wide text-white">{name}</span>
    </span>
  );
}
