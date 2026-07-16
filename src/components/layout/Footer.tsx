import { ArrowUpRight, AtSign, MapPin, Music2, Phone } from "lucide-react";
import { HOURS, NAV_LINKS, SITE } from "@/lib/data";
import { cn } from "@/lib/utils";
import { BookingTrigger } from "@/components/booking/BookingTrigger";

const socials = [
  { label: SITE.instagramHandle, href: SITE.instagram, icon: AtSign },
  { label: SITE.tiktokHandle, href: SITE.tiktok, icon: Music2 },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-edge bg-ink relative border-t">
      <div className="shell py-16 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          <div className="max-w-md">
            <p className="font-display text-4xl leading-none uppercase sm:text-5xl">
              Corte <span className="text-acid">&amp;</span> Caos
            </p>
            <p className="text-bone-dim mt-5">
              Barbería de autor en El Poblado. Solo con cita — porque tu tiempo
              y tu cara merecen que nadie improvise.
            </p>
            <div className="mt-7">
              <BookingTrigger size="lg" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <FooterColumn title="Navega">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-bone-dim hover:text-acid transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </FooterColumn>

            <FooterColumn title="Contacto">
              <li>
                <a
                  href={`tel:${SITE.phoneHref}`}
                  className="text-bone-dim hover:text-acid inline-flex items-center gap-2 transition-colors"
                >
                  <Phone className="size-3.5" strokeWidth={2} />
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={SITE.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-bone-dim hover:text-acid inline-flex items-start gap-2 transition-colors"
                >
                  <MapPin
                    className="mt-0.5 size-3.5 shrink-0"
                    strokeWidth={2}
                  />
                  <span>
                    {SITE.address}
                    <br />
                    {SITE.city}
                  </span>
                </a>
              </li>
            </FooterColumn>

            <FooterColumn title="Redes">
              {socials.map((social) => (
                <li key={social.href}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-bone-dim hover:text-acid inline-flex items-center gap-2 transition-colors"
                  >
                    <social.icon className="size-3.5" strokeWidth={2} />
                    {social.label}
                    <ArrowUpRight className="size-3" strokeWidth={2} />
                  </a>
                </li>
              ))}
            </FooterColumn>
          </div>
        </div>

        <div className="border-edge mt-14 border-t pt-8">
          <dl className="grid gap-3 sm:grid-cols-3">
            {HOURS.map((entry) => (
              <div
                key={entry.day}
                className="border-edge flex items-center justify-between gap-4 border px-4 py-3"
              >
                <dt className="text-ash font-mono text-xs tracking-[0.16em] uppercase">
                  {entry.day}
                </dt>
                <dd
                  className={cn(
                    "font-mono text-sm",
                    entry.closed ? "text-plasma" : "text-bone"
                  )}
                >
                  {entry.hours}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="text-ash mt-10 flex flex-col gap-2 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono tracking-[0.16em] uppercase">
            © {year} {SITE.name}
          </p>
          <p className="font-mono tracking-[0.16em] uppercase">
            Hecho en Medellín · Caos con método
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="text-acid mb-4 font-mono text-xs tracking-[0.2em] uppercase">
        {title}
      </h3>
      <ul className="flex flex-col gap-3 text-sm">{children}</ul>
    </div>
  );
}
