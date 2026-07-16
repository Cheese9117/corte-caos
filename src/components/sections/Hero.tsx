"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { SITE } from "@/lib/data";
import { BookingTrigger } from "@/components/booking/BookingTrigger";
import { buttonClass } from "@/components/ui/button-styles";

const EASE = [0.16, 1, 0.3, 1] as const;
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=2000&q=80";

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE, delay },
  }),
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);

  return (
    <section
      ref={sectionRef}
      id="top"
      className="grain relative flex min-h-[100svh] flex-col justify-end overflow-hidden"
    >
      <motion.div style={{ y: imageY }} className="absolute inset-0 -z-10">
        <Image
          src={HERO_IMAGE}
          alt="Barbero perfilando una barba con navaja bajo luz cálida en CORTE & CAOS"
          fill
          priority
          sizes="100vw"
          quality={80}
          className="object-cover object-center"
        />
      </motion.div>

      <motion.div
        style={{ opacity: overlayOpacity }}
        aria-hidden
        className="from-void via-void/70 to-void/30 absolute inset-0 -z-10 bg-gradient-to-t"
      />
      <div
        aria-hidden
        className="from-void/80 absolute inset-0 -z-10 bg-gradient-to-r to-transparent"
      />

      <div className="shell relative w-full pt-[calc(var(--nav-h)+3rem)] pb-14">
        <motion.p
          custom={0.1}
          variants={rise}
          initial="hidden"
          animate="visible"
          className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-2"
        >
          <span className="text-bone inline-flex items-center gap-2">
            <span className="animate-flicker bg-acid block size-2" />
            {SITE.address}, Medellín
          </span>
          <span className="bg-edge-strong hidden h-3 w-px sm:block" />
          <span>Barbería de autor · Solo con cita</span>
        </motion.p>

        <h1 className="font-display mt-8 leading-[0.82] uppercase">
          <motion.span
            custom={0.2}
            variants={rise}
            initial="hidden"
            animate="visible"
            className="block text-[clamp(3.5rem,15vw,12rem)]"
          >
            Corte
          </motion.span>
          <motion.span
            custom={0.32}
            variants={rise}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-[0.15em] text-[clamp(3.5rem,15vw,12rem)]"
          >
            <span className="text-acid">&amp;</span>
            <span className="text-stroke-acid">Caos</span>
          </motion.span>
        </h1>

        <div className="mt-8 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.p
            custom={0.44}
            variants={rise}
            initial="hidden"
            animate="visible"
            className="text-bone-dim max-w-md text-lg text-balance sm:text-xl"
          >
            No cortamos pelo. Editamos identidades. Cada silla es un ritual de
            precisión pensado para que salgas pareciéndote más a ti.
          </motion.p>

          <motion.div
            custom={0.56}
            variants={rise}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap items-center gap-4"
          >
            <BookingTrigger size="lg" />
            <a
              href="#servicios"
              className={buttonClass({ variant: "outline", size: "lg" })}
            >
              Ver la carta
            </a>
          </motion.div>
        </div>
      </div>

      <div className="shell border-edge relative flex w-full items-center justify-between border-t py-5">
        <span className="text-ash inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase">
          <ArrowDown
            className="text-acid size-4 animate-bounce"
            strokeWidth={2}
          />
          Baja y entra al caos
        </span>
        <span className="text-ash hidden font-mono text-xs tracking-[0.2em] uppercase sm:block">
          Est. 2019 — MDE
        </span>
      </div>
    </section>
  );
}
