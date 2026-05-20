import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

/**
 * Button — three variants per DESIGN_SYSTEM.md (primary / secondary / ghost).
 * Renders as <a> when `href` is set, otherwise <button>. Server-safe.
 */

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2 rounded-[6px] font-body font-medium " +
  "transition-all duration-150 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent-500 text-bone-50 border border-accent-700 " +
    "hover:bg-accent-700 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-none",
  secondary:
    "bg-transparent text-bone-800 border border-bone-300 " +
    "hover:border-bone-500 hover:bg-bone-50",
  ghost: "bg-transparent text-bone-700 border border-transparent hover:bg-bone-100",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-7 text-base",
  xl: "h-14 px-8 text-base",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof CommonProps> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", size = "md", className = "", children } = props;
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (props.href !== undefined) {
    const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
    return (
      <a className={classes} {...rest}>
        {children}
      </a>
    );
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
