import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ComponentProps } from "react";
import { cn } from "@/shared/lib";
import { PixelIcon } from "./PixelIcon";
import type { IconName } from "./PixelIcon";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

type StyleProps = {
  variant?: Variant;
  size?: Size;
  icon?: IconName;
};

export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: Pick<StyleProps, "variant" | "size"> & { className?: string }): string {
  return cn("btn", `btn--${variant}`, size === "lg" && "btn--lg", className);
}

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  type = "button",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & StyleProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...props}>
      {icon ? <PixelIcon name={icon} /> : null}
      {children}
    </button>
  );
}

export function ButtonLink({ variant, size, icon, className, children, ...props }: ComponentProps<typeof Link> & StyleProps) {
  return (
    <Link className={buttonStyles({ variant, size, className })} {...props}>
      {icon ? <PixelIcon name={icon} /> : null}
      {children}
    </Link>
  );
}

export function ButtonAnchor({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & StyleProps) {
  return (
    <a className={buttonStyles({ variant, size, className })} {...props}>
      {icon ? <PixelIcon name={icon} /> : null}
      {children}
    </a>
  );
}
