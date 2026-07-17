<div align="center">

```
 ██████╗ ██████╗ ██████╗ ████████╗███████╗     ██╗      ██████╗ █████╗  ██████╗ ███████╗
██╔════╝██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝    ██╔╝     ██╔════╝██╔══██╗██╔═══██╗██╔════╝
██║     ██║   ██║██████╔╝   ██║   █████╗     ██╔╝█████╗██║     ███████║██║   ██║███████╗
██║     ██║   ██║██╔══██╗   ██║   ██╔══╝    ██╔╝ ╚════╝██║     ██╔══██║██║   ██║╚════██║
╚██████╗╚██████╔╝██║  ██║   ██║   ███████╗ ██╔╝        ╚██████╗██║  ██║╚██████╔╝███████║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝ ╚═╝          ╚═════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝
```

**BARBERÍA DE AUTOR — EL POBLADO, MEDELLÍN**

`No cortamos pelo. Editamos identidades.`

Landing page de alto nivel: brutalismo-cyberpunk, dark mode, acento verde ácido `#CCFF00`.

<br />

[![CI](https://github.com/Cheese9117/corte-caos/actions/workflows/ci.yml/badge.svg)](https://github.com/Cheese9117/corte-caos/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-CCFF00.svg)](./LICENSE)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js)
![React](https://img.shields.io/badge/React-19-087EA4?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)

</div>

---

## ▚ Overview

**CORTE & CAOS** es una landing page single-page para una barbería premium de Medellín. El
objetivo del proyecto es sentirse como un sitio de agencia hecho a la medida — cero plantillas
genéricas, cero tropos de barbería vintage — con foco obsesivo en performance, accesibilidad y
una identidad visual coherente de principio a fin.

El flujo de reserva es una experiencia guiada de 4 pasos (Servicio → Barbero → Día & Hora →
Datos) construida como UI, lista para conectarse a un backend de WhatsApp / Google Calendar. Al
confirmar, genera un _deep link_ de WhatsApp con el resumen de la cita.

### Secciones

| # | Sección       | Qué hace                                                           |
|---|---------------|-------------------------------------------------------------------|
| 1 | **Hero**      | Imagen full-bleed con parallax, tipografía brutalista, CTA directo |
| 2 | **Manifiesto**| Marquee infinito + declaración de marca y principios              |
| 3 | **Servicios** | Lista interactiva que expande imagen y detalle al hover/focus     |
| 4 | **Equipo**    | Cards de barberos con tratamiento grayscale → color               |
| 5 | **Galería**   | Masonry responsive (CSS columns) con captions al hover            |
| 6 | **Reserva**   | Drawer multi-paso con validación type-safe + confirmación         |

---

## ▚ Tech Stack & decisiones de arquitectura

| Tecnología | Por qué |
|------------|---------|
| **Next.js 16** (App Router, RSC) | FCP casi instantáneo. Las secciones estáticas se renderizan como React Server Components; solo la interactividad (drawer, navbar, animaciones) baja como Client Components. Turbopack por defecto en dev y build. |
| **React 19.2** | Última generación del runtime que acompaña a Next 16. |
| **TypeScript (strict)** | Cero `any`. El dominio (servicios, barberos, slots) está tipado en `src/types` y consumido en toda la app. |
| **Tailwind CSS v4** | Configuración basada en CSS (`@theme` en `globals.css`), sin `tailwind.config.js`. Design tokens como custom properties → un único punto de verdad para color, tipografía y motion. |
| **Framer Motion** | Micro-interacciones y reveals on-scroll de alto rendimiento (transform/opacity), con respeto a `prefers-reduced-motion`. |
| **React Hook Form + Zod** | Validación type-safe del formulario de reserva. El schema de Zod es la fuente de verdad y deriva los tipos de TypeScript. |
| **Lucide React** | Iconos vectoriales limpios, tree-shakeable. |
| **next/image** | Conversión automática a WebP/AVIF, `srcset` responsive, `priority` en el hero para evitar CLS. |
| **next/font** | Self-hosting de Anton, Space Grotesk y JetBrains Mono con `display: swap` — cero requests a Google y cero layout shift. |

### Principios de ingeniería aplicados

- **Zero inline styles / zero inline handlers** en el markup — todo vive en Tailwind o en el
  sistema de diseño CSS.
- **Server-first**: las Client Components están acotadas a lo estrictamente interactivo.
- **Accesibilidad**: HTML semántico (`main`, `section`, `article`, `figure`), skip-link, foco
  visible, `aria-*` en el drawer (role `dialog`, `aria-modal`), bloqueo de scroll y restauración
  de foco.
- **Seguridad** (ver abajo): CSP + cabeceras endurecidas, sanitización de inputs, `rel="noopener
  noreferrer"` en todo enlace externo.
- **SEO**: Metadata API completa, OpenGraph + Twitter cards, imagen OG dinámica, JSON-LD
  (`HairSalon`), `sitemap.xml` y `robots.txt` generados.

---

## ▚ Seguridad

- **Content Security Policy** estricta y cabeceras de seguridad definidas en
  [`next.config.ts`](./next.config.ts): `X-Content-Type-Options`, `X-Frame-Options`,
  `Referrer-Policy`, `Permissions-Policy` y `Strict-Transport-Security`.
- **Sanitización** de todo texto libre del formulario antes de que salga del cliente
  (`sanitizeText` en [`src/lib/utils.ts`](./src/lib/utils.ts)).
- **Validación** en cliente con Zod: nombre, celular colombiano (regex) y notas con `maxlength`.
- **Sin secretos en el repo** — `.gitignore` cubre `.env*` desde el primer commit.

---

## ▚ Setup & instalación

> Requisitos: **Node.js ≥ 20.9** y npm.

```bash
# 1. Instalar dependencias
npm install

# 2. Variables de entorno (opcional para desarrollo local)
cp .env.example .env.local

# 3. Levantar el servidor de desarrollo (Turbopack)
npm run dev
#   → http://localhost:3000

# 4. Build de producción y arranque
npm run build
npm run start
```

### Scripts disponibles

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo con HMR |
| `npm run build` | Build de producción optimizado |
| `npm run start` | Sirve el build de producción |
| `npm run lint` | ESLint (flat config) |
| `npm run lint:fix` | ESLint con autofix |
| `npm run typecheck` | Chequeo de tipos sin emitir |
| `npm run format` | Formatea con Prettier |
| `npm run format:check` | Verifica formato sin escribir |

---

## ▚ Estructura de carpetas

```
corte-caos/
├── .github/                    # CI (GitHub Actions) + plantillas de issues/PR
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout: fuentes, metadata, providers
│   │   ├── page.tsx            # Composición de secciones + JSON-LD
│   │   ├── globals.css         # Design tokens + base + utilidades (Tailwind v4)
│   │   ├── icon.svg            # Favicon de marca
│   │   ├── opengraph-image.tsx # Imagen OG dinámica (Satori)
│   │   ├── manifest.ts         # Web App Manifest
│   │   ├── robots.ts           # /robots.txt
│   │   └── sitemap.ts          # /sitemap.xml
│   ├── components/
│   │   ├── booking/            # Flujo de reserva
│   │   │   ├── BookingProvider.tsx   # Contexto (open/close, preselección)
│   │   │   ├── BookingDrawer.tsx      # Drawer multi-paso + confirmación
│   │   │   ├── BookingTrigger.tsx     # CTA que abre el drawer
│   │   │   └── schema.ts              # Schema Zod + tipos + pasos
│   │   ├── layout/
│   │   │   ├── Navbar.tsx             # Nav fija + menú móvil
│   │   │   └── Footer.tsx             # Footer con horarios y contacto
│   │   ├── sections/
│   │   │   ├── Hero.tsx / Manifesto.tsx / Services.tsx
│   │   │   ├── ServiceRow.tsx         # Fila interactiva de servicio
│   │   │   ├── Team.tsx / Gallery.tsx / BookingBand.tsx
│   │   └── ui/
│   │       ├── Reveal.tsx             # Wrapper de reveal on-scroll
│   │       ├── Marquee.tsx            # Ticker infinito accesible
│   │       ├── SectionHeading.tsx     # Encabezado de sección
│   │       └── button-styles.ts       # Variantes de botón compartidas
│   ├── lib/
│   │   ├── data.ts             # Contenido tipado (servicios, barberos, galería…)
│   │   └── utils.ts            # cn(), formatCop(), formatDuration(), sanitizeText()
│   └── types/
│       └── index.ts            # Interfaces del dominio
├── next.config.ts             # Imágenes remotas + CSP y cabeceras de seguridad
├── tsconfig.json              # TS strict + alias @/*
├── .editorconfig              # Estilo de editor consistente
├── .nvmrc                     # Versión de Node fijada
└── .prettierrc.json
```

---

## ▚ Deployment

### Vercel (recomendado)

1. Sube el repositorio a GitHub.
2. Importa el proyecto en [vercel.com/new](https://vercel.com/new) — Next.js se detecta solo.
3. Define `NEXT_PUBLIC_SITE_URL` en las variables de entorno del proyecto.
4. Deploy. Las cabeceras de seguridad de `next.config.ts` se aplican automáticamente.

### Netlify

Usa el plugin oficial `@netlify/plugin-nextjs`. Build command `npm run build`, publish `.next`.

> **Nota sobre imágenes:** el hero y la galería usan Unsplash vía `next/image`. Los hosts
> permitidos están declarados en `images.remotePatterns` (`next.config.ts`). Para producción con
> alto tráfico, considera migrar los assets a tu propio CDN.

---

## ▚ Contribuir

Los PRs son bienvenidos. Revisa [CONTRIBUTING.md](./CONTRIBUTING.md) para los estándares de código,
el flujo de commits y el checklist previo. La CI de GitHub Actions valida formato, lint, tipos y
build en cada push.

## ▚ Seguridad

Consulta [SECURITY.md](./SECURITY.md) para la política de reporte de vulnerabilidades y las medidas
aplicadas.

## ▚ Licencia

[MIT](./LICENSE) © Juan Sebastián Henao

---

<div align="center">

**Hecho en Medellín · Caos con método**

</div>
