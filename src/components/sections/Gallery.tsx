import Image from "next/image";
import { GALLERY } from "@/lib/data";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const ASPECT: Record<string, string> = {
  tall: "aspect-[3/4]",
  square: "aspect-square",
  wide: "aspect-[3/2]",
};

export function Gallery() {
  return (
    <section id="galeria" className="border-edge border-t py-24 sm:py-32">
      <div className="shell">
        <SectionHeading
          index="03"
          eyebrow="El feed"
          title="La galería"
          align="between"
        >
          <p className="text-bone-dim">
            Cortes reales, clientes reales, cero filtros de estudio. Lo que ves
            es lo que sale de nuestras sillas.
          </p>
        </SectionHeading>

        <div className="mt-14 gap-4 [column-fill:_balance] sm:columns-2 lg:columns-3">
          {GALLERY.map((shot, index) => (
            <Reveal
              key={shot.id}
              as="figure"
              delay={(index % 3) * 0.06}
              className="group border-edge relative mb-4 block break-inside-avoid overflow-hidden border"
            >
              <div className={cn("relative w-full", ASPECT[shot.span])}>
                <Image
                  src={shot.image}
                  alt={shot.caption}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <figcaption className="from-void pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t to-transparent p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span className="text-bone font-mono text-xs tracking-[0.16em] uppercase">
                  {shot.caption}
                </span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
