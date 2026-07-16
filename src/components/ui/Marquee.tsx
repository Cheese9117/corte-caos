import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  readonly items: readonly string[];
  readonly speed?: "normal" | "slow";
  readonly className?: string;
}

/**
 * Infinite horizontal ticker. The track holds two identical copies so the
 * -50% keyframe loops seamlessly; the copy is aria-hidden to avoid repeats
 * for assistive tech.
 */
export function Marquee({ items, speed = "normal", className }: MarqueeProps) {
  return (
    <div className={cn("group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max flex-nowrap",
          speed === "slow" ? "animate-marquee-slow" : "animate-marquee",
          "group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        )}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex flex-nowrap items-center"
            aria-hidden={copy === 1}
          >
            {items.map((item) => (
              <Fragment key={`${copy}-${item}`}>
                <li className="font-display text-bone/90 px-8 text-4xl tracking-tight uppercase sm:text-5xl">
                  {item}
                </li>
                <li aria-hidden className="grid place-items-center">
                  <span className="bg-acid block h-2 w-2 rotate-45" />
                </li>
              </Fragment>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
