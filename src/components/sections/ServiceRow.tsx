"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/types";
import { cn, formatCop, formatDuration } from "@/lib/utils";
import { useBooking } from "@/components/booking/BookingProvider";

interface ServiceRowProps {
  readonly service: Service;
}

/**
 * Brutalist list row: collapsed by default, expands on hover/focus to reveal
 * the atmosphere shot and full description. The whole row opens the booking
 * drawer preselecting this service.
 */
export function ServiceRow({ service }: ServiceRowProps) {
  const { open } = useBooking();

  return (
    <li
      className={cn(
        "group border-edge border-t last:border-b",
        service.signature && "bg-acid/[0.03]"
      )}
    >
      <button
        type="button"
        onClick={() => open(service.id)}
        className="w-full px-1 text-left focus:outline-none"
        aria-label={`Agendar ${service.name} — ${formatCop(service.priceCop)}`}
      >
        <div className="flex items-center gap-5 py-7 sm:gap-8 sm:py-9">
          <span className="text-ash hidden font-mono text-xs sm:block">
            {service.index}
          </span>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-3">
              <h3 className="group-hover:text-acid text-2xl transition-colors duration-300 sm:text-3xl lg:text-4xl">
                {service.name}
              </h3>
              {service.signature ? (
                <span className="border-acid text-acid hidden shrink-0 border px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase sm:inline-block">
                  Insignia
                </span>
              ) : null}
            </div>
            <p className="text-ash mt-1.5 font-mono text-xs tracking-[0.14em] uppercase">
              {service.tagline}
            </p>
          </div>

          <div className="shrink-0 text-right">
            <p className="font-display text-bone text-xl sm:text-2xl">
              {formatCop(service.priceCop)}
            </p>
            <p className="text-ash mt-1 font-mono text-xs">
              {formatDuration(service.durationMinutes)}
            </p>
          </div>

          <ArrowUpRight
            className="text-ash group-hover:text-acid size-6 shrink-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.75}
          />
        </div>

        <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-focus-within:grid-rows-[1fr] group-hover:grid-rows-[1fr] motion-reduce:transition-none">
          <div className="overflow-hidden">
            <div className="flex flex-col gap-6 pb-8 sm:flex-row sm:items-center">
              <div className="relative aspect-[16/10] w-full overflow-hidden sm:aspect-[4/3] sm:w-56">
                <Image
                  src={service.image}
                  alt={`${service.name} en CORTE & CAOS`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, 224px"
                  className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-105 group-hover:grayscale-0"
                />
              </div>
              <p className="text-bone-dim max-w-md text-balance">
                {service.description}
              </p>
            </div>
          </div>
        </div>
      </button>
    </li>
  );
}
