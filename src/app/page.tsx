import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Services } from "@/components/sections/Services";
import { Team } from "@/components/sections/Team";
import { Gallery } from "@/components/sections/Gallery";
import { BookingBand } from "@/components/sections/BookingBand";
import { SITE } from "@/lib/data";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HairSalon",
  name: SITE.name,
  description: SITE.description,
  url: SITE.domain,
  telephone: SITE.phoneDisplay,
  priceRange: "$$$",
  image: `${SITE.domain}/opengraph-image`,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address,
    addressLocality: "Medellín",
    addressRegion: "Antioquia",
    addressCountry: "CO",
  },
  areaServed: "Medellín",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "21:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "22:00",
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Manifesto />
      <Services />
      <Team />
      <Gallery />
      <BookingBand />
    </>
  );
}
