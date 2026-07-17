# Guía de contribución

Gracias por tu interés en **CORTE & CAOS**. Esta guía resume cómo trabajar en el proyecto.

## Requisitos

- **Node.js ≥ 20.9** (ver [`.nvmrc`](./.nvmrc) — `nvm use`)
- npm

## Puesta en marcha

```bash
npm install
npm run dev   # http://localhost:3000
```

## Estándares de código

- **TypeScript strict** — sin `any`, sin tipos implícitos.
- **Zero inline styles / inline handlers** en el markup; todo vive en Tailwind o en el sistema de diseño (`src/app/globals.css`).
- **Server-first**: usa Client Components (`"use client"`) solo cuando haya interactividad, estado o hooks del navegador.
- Componentes pequeños y de propósito único; nombres semánticos.
- Sin `console.log`, código muerto ni `TODO` en `main`.

Antes de abrir un PR, todo esto debe pasar en verde (lo valida también la CI):

```bash
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Para autoformatear y autocorregir:

```bash
npm run format
npm run lint:fix
```

## Commits

Usa [Conventional Commits](https://www.conventionalcommits.org/):

```
feat:     nueva funcionalidad
fix:      corrección de bug
refactor: cambio interno sin alterar comportamiento
style:    UI / estilos
docs:     documentación
chore:    tooling / mantenimiento
```

## Pull Requests

1. Crea una rama descriptiva (`feat/booking-calendar`, `fix/mobile-nav`).
2. Mantén el PR enfocado en un solo cambio.
3. Rellena la plantilla de PR e incluye capturas para cambios visuales.
