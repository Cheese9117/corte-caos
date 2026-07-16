"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

const EASE = [0.16, 1, 0.3, 1] as const;

function Wordmark() {
  return (
    <a
      href="#top"
      className="group flex items-baseline gap-2"
      aria-label={`${SITE.name} — inicio`}
    >
      <span className="font-display text-xl leading-none tracking-tight uppercase">
        Corte
      </span>
      <span className="font-display text-acid text-xl leading-none tracking-tight uppercase">
        &amp;
      </span>
      <span className="font-display text-xl leading-none tracking-tight uppercase">
        Caos
      </span>
    </a>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-500",
        scrolled || menuOpen
          ? "border-edge bg-void/85 border-b backdrop-blur-md"
          : "border-b border-transparent"
      )}
    >
      <nav className="shell flex h-[var(--nav-h)] items-center justify-between">
        <Wordmark />

        <ul className="hidden items-center gap-9 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="link-underline text-bone-dim hover:text-bone py-1 font-mono text-xs tracking-[0.18em] uppercase transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <BookingTrigger size="md" />
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            className="border-edge text-bone hover:border-acid hover:text-acid grid size-11 place-items-center border transition-colors lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" strokeWidth={2.5} />
            ) : (
              <Menu className="size-5" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="border-edge bg-void border-t lg:hidden"
          >
            <ul className="shell flex flex-col py-6">
              {NAV_LINKS.map((link, index) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="border-edge font-display flex items-center justify-between border-b py-4 text-3xl uppercase"
                  >
                    {link.label}
                    <span className="text-acid font-mono text-xs">
                      0{index + 1}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <div className="shell pb-8">
              <BookingTrigger
                size="lg"
                className="w-full"
                label="Agendar cita"
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
