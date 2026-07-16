import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost";
type Size = "md" | "lg";

const BASE =
  "group/btn relative inline-flex items-center justify-center gap-2.5 " +
  "font-mono text-xs font-medium uppercase tracking-[0.18em] " +
  "transition-[transform,background-color,color,border-color,box-shadow] duration-300 " +
  "ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-offset-4 " +
  "disabled:pointer-events-none disabled:opacity-50 active:translate-y-px";

const VARIANTS: Record<Variant, string> = {
  primary:
    "bg-acid text-void hover:shadow-[0_0_34px_-4px_var(--acid)] hover:-translate-y-0.5",
  outline:
    "border border-edge-strong text-bone hover:border-acid hover:text-acid",
  ghost: "text-bone-dim hover:text-acid",
};

const SIZES: Record<Size, string> = {
  md: "h-11 px-6",
  lg: "h-14 px-8 text-[0.8rem]",
};

interface ButtonStyleOptions {
  readonly variant?: Variant;
  readonly size?: Size;
  readonly className?: string;
}

export function buttonClass({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(BASE, VARIANTS[variant], SIZES[size], className);
}
