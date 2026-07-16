import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/ui/Reveal";

interface SectionHeadingProps {
  readonly index: string;
  readonly eyebrow: string;
  readonly title: ReactNode;
  readonly align?: "start" | "between";
  readonly className?: string;
  readonly children?: ReactNode;
}

/** Shared section header: numbered eyebrow, brutalist title, optional aside. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  align = "start",
  className,
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        align === "between" &&
          "lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className
      )}
    >
      <div className="max-w-2xl">
        <Reveal>
          <p className="eyebrow flex items-center gap-3">
            <span className="text-acid">{index}</span>
            <span className="bg-acid/60 h-px w-8" />
            {eyebrow}
          </p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-5 text-5xl text-balance sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </Reveal>
      </div>
      {children ? (
        <Reveal delay={0.12} className="max-w-md lg:text-right">
          {children}
        </Reveal>
      ) : null}
    </div>
  );
}
