import Link from "next/link";
import type { ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/shared/lib";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-md border font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neon-cyan disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "border-neon-pink bg-neon-pink/15 text-white shadow-[0_0_28px_-8px_var(--color-neon-pink)] hover:bg-neon-pink/30",
  secondary: "border-line-strong bg-surface-2 text-fg hover:border-neon-cyan hover:text-white",
  ghost: "border-transparent text-muted hover:text-white",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

export function buttonStyles({ variant = "primary", size = "md", className }: StyleProps & { className?: string }): string {
  return cn(base, variants[variant], sizes[size], className);
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return <button type={type} className={buttonStyles({ variant, size, className })} {...props} />;
}

export function ButtonLink({ variant, size, className, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return <Link className={buttonStyles({ variant, size, className })} {...props} />;
}
