"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

const variants: Variants = {
  hidden: { opacity: 0, y: 26, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
};

interface RevealProps {
  readonly children: ReactNode;
  readonly delay?: number;
  readonly className?: string;
  readonly as?: "div" | "li" | "section" | "figure" | "article";
}

/** Scroll-triggered entrance. Respects reduced-motion via the global CSS reset. */
export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
}: RevealProps) {
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
