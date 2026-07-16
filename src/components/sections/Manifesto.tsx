import { MANIFESTO_MARQUEE } from "@/lib/data";
import { Marquee } from "@/components/ui/Marquee";
import { Reveal } from "@/components/ui/Reveal";

const principles = [
  {
    index: "01",
    title: "Diagnóstico, no plantilla",
    body: "Leemos tu rostro, tu pelo y tu vida antes de tocar una máquina. Lo que sale de aquí no le queda a nadie más.",
  },
  {
    index: "02",
    title: "Precisión con actitud",
    body: "Técnica de relojero, estética de calle. La disciplina es la que te deja romper las reglas sin que se note el esfuerzo.",
  },
  {
    index: "03",
    title: "Un ritual, no un trámite",
    body: "Música, aroma, una bebida y cero afán. Sales renovado por fuera y desconectado por dentro.",
  },
] as const;

export function Manifesto() {
  return (
    <section
      id="manifiesto"
      className="border-edge relative border-y py-24 sm:py-32"
    >
      <div className="grid-veil pointer-events-none absolute inset-0 -z-10 opacity-40" />

      <Marquee
        items={MANIFESTO_MARQUEE}
        className="border-edge mb-20 border-y py-6"
      />

      <div className="shell">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="eyebrow flex items-center gap-3">
                <span className="text-acid">§</span>
                El manifiesto
              </p>
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-6 text-4xl text-balance sm:text-6xl lg:text-[4.5rem]">
                Esto no es un corte.
                <br />
                Es una <span className="text-acid">declaración</span>.
              </h2>
            </Reveal>
          </div>

          <div className="flex items-end lg:col-span-5">
            <Reveal delay={0.12}>
              <p className="text-bone-dim text-lg text-balance">
                Nacimos hartos de las barberías en serie: la misma silla, el
                mismo degradado, el mismo resultado tibio. CORTE &amp; CAOS
                existe para lo contrario — para el que entiende que la imagen es
                lenguaje y no quiere hablar como los demás.
              </p>
            </Reveal>
          </div>
        </div>

        <div className="border-edge bg-edge mt-20 grid gap-px overflow-hidden border sm:grid-cols-3">
          {principles.map((principle, index) => (
            <Reveal
              key={principle.index}
              delay={index * 0.08}
              className="bg-void hover:bg-carbon flex h-full flex-col gap-5 p-8 transition-colors duration-300"
            >
              <span className="text-acid font-mono text-sm">
                {principle.index}
              </span>
              <h3 className="text-2xl">{principle.title}</h3>
              <p className="text-bone-dim">{principle.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
