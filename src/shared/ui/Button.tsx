import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/shared/lib";
import type { Accent } from "./accent";
import { IconBox } from "./IconBox";
import type { IconName } from "./PixelIcon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  accent?: Accent;
  icon?: IconName;
};

const variants: Record<Variant, string> = {
  primary: "hud-button--primary",
  secondary: "hud-button--secondary",
  ghost: "hud-button--ghost",
};

const sizes: Record<Size, string> = {
  md: "",
  lg: "hud-button--lg",
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  accent,
  className,
}: Pick<StyleProps, "variant" | "size" | "accent"> & { className?: string }): string {
  const tone: Accent = accent ?? (variant === "secondary" ? "cyan" : "pink");
  return cn("hud-button", variants[variant], sizes[size], `tone-${tone}`, className);
}

export function Button({
  variant,
  size,
  accent,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return (
    <button
      type={type}
      data-icon={icon ? "" : undefined}
      className={buttonStyles({ variant, size, accent, className })}
      {...props}
    >
      {icon ? <IconBox icon={icon} /> : null}
      <span className="hud-button__label">{children}</span>
    </button>
  );
}

export function ButtonLink({ variant, size, accent, icon, className, children, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link data-icon={icon ? "" : undefined} className={buttonStyles({ variant, size, accent, className })} {...props}>
      {icon ? <IconBox icon={icon} /> : null}
      <span className="hud-button__label">{children}</span>
    </Link>
  );
}

export function ButtonAnchor({
  variant,
  size,
  accent,
  icon,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return (
    <a data-icon={icon ? "" : undefined} className={buttonStyles({ variant, size, accent, className })} {...props}>
      {icon ? <IconBox icon={icon} /> : null}
      <span className="hud-button__label">{children}</span>
    </a>
  );
}
