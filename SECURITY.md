# Política de seguridad

## Reportar una vulnerabilidad

Si encuentras una vulnerabilidad, **no abras un issue público**. Usa la pestaña
**Security → Report a vulnerability** del repositorio (GitHub Private Vulnerability
Reporting). Intentamos responder en un plazo de 72 horas.

## Medidas aplicadas en este proyecto

- **Content Security Policy** y cabeceras endurecidas (`X-Content-Type-Options`,
  `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`,
  `Strict-Transport-Security`) definidas en [`next.config.ts`](./next.config.ts).
- **Sanitización** de todo texto libre del formulario antes de que salga del cliente
  (`sanitizeText` en [`src/lib/utils.ts`](./src/lib/utils.ts)).
- **Validación** type-safe con Zod (nombre, celular colombiano, notas con `maxlength`).
- **Sin secretos en el repo** — `.gitignore` cubre `.env*`. Usa `.env.local` para
  configuración sensible.
- **Enlaces externos** con `rel="noopener noreferrer"`.

## Dependencias

Mantén las dependencias al día y ejecuta `npm audit` periódicamente.
