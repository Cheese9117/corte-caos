/** Join truthy class fragments — a dependency-free `clsx` for local use. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

const copFormatter = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** Colombian peso, no decimals: 75000 -> "$75.000". */
export function formatCop(value: number): string {
  return copFormatter.format(value);
}

/** Human duration from minutes: 90 -> "1h 30m", 45 -> "45m". */
export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const rest = minutes % 60;
  if (hours === 0) return `${rest}m`;
  if (rest === 0) return `${hours}h`;
  return `${hours}h ${rest}m`;
}

/**
 * Collapse whitespace and strip angle brackets from free-text input before it
 * ever reaches state or a downstream channel (WhatsApp, calendar, CRM).
 */
export function sanitizeText(value: string): string {
  return value.replace(/[<>]/g, "").replace(/\s+/g, " ").trim();
}
