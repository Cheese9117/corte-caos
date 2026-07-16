import Image from "next/image";
import { BARBERS } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Team() {
  return (
    <section id="equipo" className="border-edge border-t py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="02"
          eyebrow="El equipo"
          title="Los artistas"
          align="between"
        >
          <p className="text-bone-dim">
            Tres manos, tres obsesiones distintas. Elige la tuya al agendar o
            deja que te asignemos el match perfecto.
          </p>
        </SectionHeading>

        <div className="border-edge bg-edge mt-14 grid gap-px overflow-hidden border md:grid-cols-3">
          {BARBERS.map((barber, index) => (
            <Reveal
              key={barber.id}
              delay={index * 0.08}
              as="article"
              className="group bg-void flex flex-col"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={barber.image}
                  alt={`${barber.alias}, especialista en ${barber.specialty}`}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-[1.04] group-hover:grayscale-0"
                />
                <div
                  aria-hidden
                  className="from-void via-void/10 absolute inset-0 bg-gradient-to-t to-transparent"
                />
                <span className="border-acid/60 bg-void/70 text-acid absolute top-4 left-4 border px-2 py-1 font-mono text-[0.6rem] tracking-widest uppercase backdrop-blur-sm">
                  {barber.signatureMove}
                </span>
              </div>

              <div className="flex flex-1 flex-col gap-3 p-6">
                <div>
                  <h3 className="text-3xl">{barber.alias}</h3>
                  <p className="text-acid mt-1 font-mono text-xs tracking-[0.14em] uppercase">
                    {barber.specialty}
                  </p>
                </div>
                <p className="text-bone-dim text-sm">{barber.bio}</p>
                <p className="text-ash mt-auto pt-3 font-mono text-xs">
                  {barber.realName}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
