import type {
  Barber,
  GalleryShot,
  OperatingDay,
  Service,
  TimeSlot,
} from "@/types";

const UNSPLASH = "https://images.unsplash.com";

/** Bounded source URL — next/image resizes down per breakpoint from here. */
const shot = (id: string, width = 1400): string =>
  `${UNSPLASH}/${id}?auto=format&fit=crop&w=${width}&q=80`;

/**
 * Canonical origin. Overridable per environment (preview/staging) via
 * NEXT_PUBLIC_SITE_URL; falls back to the production domain.
 */
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://corteycaos.co"
).replace(/\/$/, "");

export const SITE = {
  name: "CORTE & CAOS",
  shortName: "C&C",
  domain: SITE_URL,
  tagline: "Barbería de autor — El Poblado, Medellín",
  description:
    "Barbería de autor en El Poblado, Medellín. Cortes de precisión, rituales de barba y un lenguaje visual que no se parece a nada. Agenda tu cita.",
  phoneDisplay: "+57 300 214 0099",
  phoneHref: "+573002140099",
  whatsappHref: "https://wa.me/573002140099",
  address: "Cra. 35 #8A-31, El Poblado",
  city: "Medellín, Colombia",
  instagram: "https://instagram.com",
  instagramHandle: "@corteycaos",
  tiktok: "https://tiktok.com",
  tiktokHandle: "@corteycaos",
  mapsHref: "https://maps.google.com/?q=Cra+35+8A-31+El+Poblado+Medellin",
} as const;

export const NAV_LINKS = [
  { label: "Manifiesto", href: "#manifiesto" },
  { label: "Servicios", href: "#servicios" },
  { label: "El equipo", href: "#equipo" },
  { label: "Galería", href: "#galeria" },
] as const;

export const SERVICES: readonly Service[] = [
  {
    id: "corte-autor",
    index: "01",
    name: "Corte de Autor",
    tagline: "Tu cara, tu regla",
    description:
      "Diagnóstico de rostro, densidad y remolinos. Corte diseñado a mano alzada con tijera y máquina. No copiamos referencias: las superamos.",
    durationMinutes: 60,
    priceCop: 75000,
    image: shot("photo-1599351431202-1e0f0137899a"),
  },
  {
    id: "ritual-barba",
    index: "02",
    name: "Perfilado de Barba + Ritual de Toalla Caliente",
    tagline: "Navaja, vapor y silencio",
    description:
      "Perfilado con navaja, toalla caliente, aceites botánicos y masaje facial. Quince minutos para desaparecer del mundo.",
    durationMinutes: 45,
    priceCop: 45000,
    image: shot("photo-1596728325488-58c87691e9af"),
  },
  {
    id: "combo-total",
    index: "03",
    name: "Corte + Barba — El Combo Total",
    tagline: "La transformación completa",
    description:
      "El paquete que reordena tu cara entera. Corte de autor y ritual de barba en una sola sesión, con lavado y styling final.",
    durationMinutes: 90,
    priceCop: 110000,
    image: shot("photo-1622286342621-4bd786c2447c"),
  },
  {
    id: "line-up",
    index: "04",
    name: "Line-Up + Diseño",
    tagline: "Geometría en la piel",
    description:
      "Perfilado quirúrgico de contornos y diseños con cuchilla. Líneas rectas, curvas imposibles y detalles que se ven de lejos.",
    durationMinutes: 40,
    priceCop: 38000,
    image: shot("photo-1503443207922-dff7d543fd0e"),
  },
  {
    id: "color",
    index: "05",
    name: "Color & Decoloración",
    tagline: "Rompe el default",
    description:
      "Platinos, tonos fantasía y bloques de color pensados para tu tono de piel. Producto premium y cuidado post-color incluido.",
    durationMinutes: 120,
    priceCop: 160000,
    image: shot("photo-1605497788044-5a32c7078486"),
  },
  {
    id: "ritual-caos",
    index: "06",
    name: "El Ritual C&C",
    tagline: "La experiencia insignia",
    description:
      "Nuestra firma. Corte de autor, ritual de barba, mascarilla, bebida de la casa y sesión de fotos para tu feed. Reservado para quien va en serio.",
    durationMinutes: 120,
    priceCop: 210000,
    image: shot("photo-1503951914875-452162b0f3f1"),
    signature: true,
  },
];

export const BARBERS: readonly Barber[] = [
  {
    id: "el-cirujano",
    alias: "El Cirujano",
    realName: "Andrés Vélez",
    specialty: "Fades de precisión",
    bio: "Doce años detrás de la silla. Obsesionado con las transiciones invisibles y los degradados que no perdonan un pelo fuera de lugar.",
    image: shot("photo-1517832606299-7ae9b720a186", 900),
    signatureMove: "Skin fade a espejo",
  },
  {
    id: "la-cuchilla",
    alias: "La Cuchilla",
    realName: "Mateo Restrepo",
    specialty: "Barba & navaja",
    bio: "Maestro de la navaja tradicional. Cree que una barba bien perfilada dice más de un hombre que cualquier frase que ensaye.",
    image: shot("photo-1521572163474-6864f9cf17ab", 900),
    signatureMove: "Perfilado clásico a navaja",
  },
  {
    id: "neon",
    alias: "Neón",
    realName: "Samuel Ortiz",
    specialty: "Color & diseño",
    bio: "El que se atreve. Color de fantasía, diseños con cuchilla y todo lo que rompa el molde. Si nadie lo ha hecho, mejor.",
    image: shot("photo-1519345182560-3f2917c472ef", 900),
    signatureMove: "Bloques de platino + line art",
  },
];

export const GALLERY: readonly GalleryShot[] = [
  {
    id: "g1",
    image: shot("photo-1585747860715-2ba37e788b70", 1100),
    caption: "El taller — El Poblado",
    span: "tall",
  },
  {
    id: "g2",
    image: shot("photo-1599351431202-1e0f0137899a", 900),
    caption: "Fade + diseño",
    span: "square",
  },
  {
    id: "g3",
    image: shot("photo-1605497788044-5a32c7078486", 1200),
    caption: "Styling final",
    span: "wide",
  },
  {
    id: "g4",
    image: shot("photo-1622286342621-4bd786c2447c", 900),
    caption: "Tijera sobre textura",
    span: "square",
  },
  {
    id: "g5",
    image: shot("photo-1503443207922-dff7d543fd0e", 900),
    caption: "Ritual de barba",
    span: "tall",
  },
  {
    id: "g6",
    image: shot("photo-1567894340315-735d7c361db0", 900),
    caption: "Precisión a máquina",
    span: "square",
  },
  {
    id: "g7",
    image: shot("photo-1493256338651-d82f7acb2b38", 1200),
    caption: "Detalle de contorno",
    span: "wide",
  },
  {
    id: "g8",
    image: shot("photo-1519345182560-3f2917c472ef", 900),
    caption: "Actitud de calle",
    span: "square",
  },
];

export const TIME_SLOTS: readonly TimeSlot[] = [
  { id: "t-0900", label: "9:00", period: "Mañana" },
  { id: "t-1030", label: "10:30", period: "Mañana" },
  { id: "t-1200", label: "12:00", period: "Mañana" },
  { id: "t-1400", label: "2:00", period: "Tarde" },
  { id: "t-1530", label: "3:30", period: "Tarde" },
  { id: "t-1700", label: "5:00", period: "Tarde" },
  { id: "t-1900", label: "7:00", period: "Noche" },
  { id: "t-2030", label: "8:30", period: "Noche" },
];

export const HOURS: readonly OperatingDay[] = [
  { day: "Lun — Vie", hours: "9:00 — 21:00" },
  { day: "Sábado", hours: "9:00 — 22:00" },
  { day: "Domingo", hours: "Cerrado", closed: true },
];

export const MANIFESTO_MARQUEE = [
  "Corte de autor",
  "Ritual de barba",
  "El Poblado",
  "Sin plantillas",
  "Solo con cita",
  "Caos con método",
] as const;
