import { Phone } from "lucide-react";
import { SITE } from "@/lib/data";
import { Reveal } from "@/components/ui/Reveal";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

export function BookingBand() {
  return (
    <section className="grain border-edge bg-carbon relative overflow-hidden border-t py-28 sm:py-36">
      <div className="grid-veil pointer-events-none absolute inset-0 -z-0 opacity-60" />
      <div
        aria-hidden
        className="bg-acid/10 pointer-events-none absolute top-1/2 -right-24 -z-0 h-[36rem] w-[36rem] -translate-y-1/2 rounded-full blur-[120px]"
      />

      <div className="shell relative z-10 flex flex-col items-center text-center">
        <Reveal>
          <p className="eyebrow">Última llamada</p>
        </Reveal>
        <Reveal delay={0.06}>
          <h2 className="mt-6 text-6xl text-balance sm:text-7xl lg:text-8xl">
            Reserva tu <span className="text-acid">silla</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-bone-dim mt-6 max-w-xl text-lg text-balance">
            Los cupos vuelan y no improvisamos con walk-ins. Aparta tu ritual en
            menos de un minuto y llega directo a lo bueno.
          </p>
        </Reveal>
        <Reveal delay={0.18}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <BookingTrigger size="lg" />
            <a
              href={`tel:${SITE.phoneHref}`}
              className="text-bone-dim hover:text-acid inline-flex items-center gap-2.5 font-mono text-sm transition-colors"
            >
              <Phone className="size-4" strokeWidth={2} />
              {SITE.phoneDisplay}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
