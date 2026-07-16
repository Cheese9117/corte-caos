import type { Metadata, Viewport } from "next";
import { Anton, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE } from "@/lib/data";
import { BookingProvider } from "@/components/booking/BookingProvider";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const displayFont = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const sansFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  keywords: [
    "barbería Medellín",
    "barbería El Poblado",
    "corte de autor",
    "barbería premium Medellín",
    "perfilado de barba",
    "fade Medellín",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "business",
};

export const viewport: Viewport = {
  themeColor: "#050506",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-CO"
      data-scroll-behavior="smooth"
      className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable} scroll-smooth`}
    >
      <body className="bg-void text-bone min-h-dvh antialiased">
        <a
          href="#top"
          className="focus:bg-acid focus:text-void sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:tracking-widest focus:uppercase"
        >
          Saltar al contenido
        </a>
        <BookingProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </BookingProvider>
      </body>
    </html>
  );
}
