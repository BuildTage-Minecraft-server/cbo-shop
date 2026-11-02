import { cn } from "@/shared/lib";

export function Logo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" shapeRendering="crispEdges">
        <path fill="#4dc9dc" d="M6 0h26v26l-6 6H0V6z" />
        <path fill="#031418" d="M8 2h16v4H8zM4 6h8v4H4zM20 6h8v4h-8zM4 10h8v12H4zM4 22h8v4H4zM20 22h8v4h-8zM8 26h16v4H8z" />
      </svg>
      <span className="font-display text-3xl font-bold leading-none tracking-wide text-white">{name}</span>
    </span>
  );
}
