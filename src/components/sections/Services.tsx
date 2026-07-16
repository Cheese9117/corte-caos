import { SERVICES } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceRow } from "@/components/sections/ServiceRow";

export function Services() {
  return (
    <section id="servicios" className="py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="01"
          eyebrow="La carta"
          title={
            <>
              Servicios &<br className="hidden sm:block" /> tarifas
            </>
          }
          align="between"
        >
          <p className="text-bone-dim">
            Precios en pesos colombianos, sin sorpresas. Pasa el cursor sobre
            cada servicio para ver el detalle, o toca para agendarlo directo.
          </p>
        </SectionHeading>

        <ul className="mt-14">
          {SERVICES.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </ul>
      </div>
    </section>
  );
}
