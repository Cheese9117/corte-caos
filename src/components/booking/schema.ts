import { z } from "zod";

/** Colombian mobile: optional +57, then a 3xx number of 10 digits. */
const COLOMBIAN_PHONE = /^(?:\+?57)?\s?3\d{2}\s?\d{3}\s?\d{4}$/;

export const bookingSchema = z.object({
  serviceId: z.string().min(1, "Elige un servicio para continuar."),
  barberId: z.string().min(1, "Elige un barbero o marca sin preferencia."),
  day: z.string().min(1, "Selecciona un día."),
  slotId: z.string().min(1, "Selecciona una hora."),
  name: z
    .string()
    .trim()
    .min(2, "Cuéntanos tu nombre.")
    .max(60, "Máximo 60 caracteres."),
  phone: z
    .string()
    .trim()
    .regex(COLOMBIAN_PHONE, "Escribe un celular colombiano válido (3xx…)."),
  notes: z.string().max(240, "Máximo 240 caracteres.").optional(),
});

export type BookingValues = z.infer<typeof bookingSchema>;

export const NO_PREFERENCE_BARBER = "sin-preferencia";

export type BookingStepId = "service" | "barber" | "schedule" | "details";

export interface BookingStep {
  readonly id: BookingStepId;
  readonly index: string;
  readonly title: string;
  readonly fields: readonly (keyof BookingValues)[];
}

export const BOOKING_STEPS: readonly BookingStep[] = [
  { id: "service", index: "01", title: "Servicio", fields: ["serviceId"] },
  { id: "barber", index: "02", title: "Barbero", fields: ["barberId"] },
  {
    id: "schedule",
    index: "03",
    title: "Día & hora",
    fields: ["day", "slotId"],
  },
  {
    id: "details",
    index: "04",
    title: "Tus datos",
    fields: ["name", "phone", "notes"],
  },
];
