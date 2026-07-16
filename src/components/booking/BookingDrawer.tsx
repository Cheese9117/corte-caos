"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  useForm,
  useWatch,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock,
  MessageCircle,
  Scissors,
  X,
} from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import {
  BOOKING_STEPS,
  NO_PREFERENCE_BARBER,
  bookingSchema,
  type BookingValues,
} from "@/components/booking/schema";
import { BARBERS, SERVICES, SITE, TIME_SLOTS } from "@/lib/data";
import { cn, formatCop, formatDuration, sanitizeText } from "@/lib/utils";
import { buttonClass } from "@/components/ui/button-styles";

interface DayOption {
  readonly id: string;
  readonly weekday: string;
  readonly dayNum: number;
  readonly month: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

const capitalize = (value: string): string =>
  value.charAt(0).toUpperCase() + value.slice(1);

/** Next `count` opening days starting tomorrow, skipping Sundays. */
function buildUpcomingDays(count: number): DayOption[] {
  const weekdayFmt = new Intl.DateTimeFormat("es-CO", { weekday: "short" });
  const monthFmt = new Intl.DateTimeFormat("es-CO", { month: "short" });
  const days: DayOption[] = [];
  const cursor = new Date();
  cursor.setHours(0, 0, 0, 0);

  while (days.length < count) {
    cursor.setDate(cursor.getDate() + 1);
    if (cursor.getDay() === 0) continue;
    days.push({
      id: cursor.toISOString().slice(0, 10),
      weekday: capitalize(weekdayFmt.format(cursor).replace(".", "")),
      dayNum: cursor.getDate(),
      month: capitalize(monthFmt.format(cursor).replace(".", "")),
    });
  }
  return days;
}

const EMPTY_VALUES: BookingValues = {
  serviceId: "",
  barberId: "",
  day: "",
  slotId: "",
  name: "",
  phone: "",
  notes: "",
};

/**
 * Portal host. Renders nothing on the server; on the client it mounts the
 * booking flow only while open, so the flow's state is born fresh on every
 * open with no effect-driven resets.
 */
export function BookingDrawer() {
  const { isOpen, preselectedServiceId, close } = useBooking();
  const isServer = useSyncExternalStore(
    () => () => {},
    () => false,
    () => true
  );

  if (isServer) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen ? (
        <BookingFlow
          preselectedServiceId={preselectedServiceId}
          onClose={close}
        />
      ) : null}
    </AnimatePresence>,
    document.body
  );
}

interface BookingFlowProps {
  readonly preselectedServiceId: string | null;
  readonly onClose: () => void;
}

function BookingFlow({ preselectedServiceId, onClose }: BookingFlowProps) {
  const [stepIndex, setStepIndex] = useState(preselectedServiceId ? 1 : 0);
  const [submitted, setSubmitted] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const days = useMemo(() => buildUpcomingDays(6), []);

  const {
    register,
    handleSubmit,
    setValue,
    control,
    trigger,
    formState: { errors },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { ...EMPTY_VALUES, serviceId: preselectedServiceId ?? "" },
    mode: "onTouched",
  });

  // Fully populated from defaultValues on every render — safe to treat as complete.
  const values = useWatch({ control }) as BookingValues;
  const step = BOOKING_STEPS[stepIndex];
  const isLastStep = stepIndex === BOOKING_STEPS.length - 1;

  // While mounted: lock scroll, focus the panel, wire Escape, and restore
  // focus to the invoking element on unmount.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => panelRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const goNext = useCallback(async () => {
    const valid = await trigger(step.fields);
    if (!valid) return;
    setStepIndex((current) => Math.min(current + 1, BOOKING_STEPS.length - 1));
  }, [step.fields, trigger]);

  const goBack = useCallback(
    () => setStepIndex((current) => Math.max(current - 1, 0)),
    []
  );

  const onValid = useCallback((data: BookingValues) => {
    // UI-only flow: no network. Payload is shaped for the WhatsApp/calendar
    // backend and sanitised before it leaves the form.
    void {
      ...data,
      name: sanitizeText(data.name),
      notes: data.notes ? sanitizeText(data.notes) : undefined,
    };
    setSubmitted(true);
  }, []);

  const selectedService = SERVICES.find((s) => s.id === values.serviceId);
  const selectedBarber = BARBERS.find((b) => b.id === values.barberId);
  const selectedDay = days.find((d) => d.id === values.day);
  const selectedSlot = TIME_SLOTS.find((s) => s.id === values.slotId);

  const whatsappText = selectedService
    ? encodeURIComponent(
        `Hola CORTE & CAOS, quiero confirmar mi cita:\n` +
          `• Servicio: ${selectedService.name}\n` +
          `• Barbero: ${selectedBarber?.alias ?? "Sin preferencia"}\n` +
          `• Día: ${selectedDay?.weekday} ${selectedDay?.dayNum} ${selectedDay?.month}\n` +
          `• Hora: ${selectedSlot?.label}\n` +
          `• Nombre: ${sanitizeText(values.name)}`
      )
    : "";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex justify-end"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <button
        type="button"
        aria-label="Cerrar agendamiento"
        onClick={onClose}
        className="bg-void/80 absolute inset-0 backdrop-blur-sm"
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        tabIndex={-1}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: EASE }}
        className="border-edge-strong bg-ink relative flex h-full w-full max-w-xl flex-col border-l outline-none"
      >
        <header className="border-edge flex items-start justify-between gap-4 border-b px-6 py-5 sm:px-8">
          <div>
            <p className="eyebrow flex items-center gap-2">
              <Scissors className="text-acid size-3.5" strokeWidth={2.5} />
              Reserva
            </p>
            <h2 id="booking-title" className="mt-2 text-2xl sm:text-3xl">
              {submitted ? "Cita registrada" : "Diseña tu cita"}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="border-edge text-bone-dim hover:border-acid hover:text-acid grid size-10 shrink-0 place-items-center border transition-colors"
          >
            <X className="size-4" strokeWidth={2.5} />
          </button>
        </header>

        {submitted ? (
          <ConfirmationScreen
            serviceName={selectedService?.name ?? ""}
            barberAlias={selectedBarber?.alias ?? "Sin preferencia"}
            dayLabel={
              selectedDay
                ? `${selectedDay.weekday} ${selectedDay.dayNum} ${selectedDay.month}`
                : ""
            }
            slotLabel={selectedSlot?.label ?? ""}
            whatsappUrl={`${SITE.whatsappHref}?text=${whatsappText}`}
            onClose={onClose}
          />
        ) : (
          <>
            <StepProgress activeIndex={stepIndex} />

            <form
              onSubmit={handleSubmit(onValid)}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-8">
                {step.id === "service" ? (
                  <ServiceStep
                    value={values.serviceId}
                    error={errors.serviceId?.message}
                    onSelect={(id) =>
                      setValue("serviceId", id, {
                        shouldValidate: true,
                      })
                    }
                  />
                ) : null}

                {step.id === "barber" ? (
                  <BarberStep
                    value={values.barberId}
                    error={errors.barberId?.message}
                    onSelect={(id) =>
                      setValue("barberId", id, { shouldValidate: true })
                    }
                  />
                ) : null}

                {step.id === "schedule" ? (
                  <ScheduleStep
                    days={days}
                    dayValue={values.day}
                    slotValue={values.slotId}
                    dayError={errors.day?.message}
                    slotError={errors.slotId?.message}
                    onSelectDay={(id) =>
                      setValue("day", id, { shouldValidate: true })
                    }
                    onSelectSlot={(id) =>
                      setValue("slotId", id, { shouldValidate: true })
                    }
                  />
                ) : null}

                {step.id === "details" ? (
                  <DetailsStep register={register} errors={errors} />
                ) : null}
              </div>

              <footer className="border-edge flex items-center justify-between gap-3 border-t px-6 py-5 sm:px-8">
                <button
                  type="button"
                  onClick={goBack}
                  disabled={stepIndex === 0}
                  className={buttonClass({
                    variant: "ghost",
                    className: "px-2",
                  })}
                >
                  <ArrowLeft className="size-4" strokeWidth={2.5} />
                  Atrás
                </button>

                {isLastStep ? (
                  <button type="submit" className={buttonClass({ size: "md" })}>
                    Confirmar cita
                    <Check className="size-4" strokeWidth={2.5} />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={goNext}
                    className={buttonClass({ size: "md" })}
                  >
                    Siguiente
                    <ArrowRight className="size-4" strokeWidth={2.5} />
                  </button>
                )}
              </footer>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

function StepProgress({ activeIndex }: { activeIndex: number }) {
  return (
    <ol className="border-edge flex items-center gap-2 border-b px-6 py-4 sm:px-8">
      {BOOKING_STEPS.map((s, index) => {
        const state =
          index < activeIndex
            ? "done"
            : index === activeIndex
              ? "active"
              : "todo";
        return (
          <li key={s.id} className="flex flex-1 items-center gap-2">
            <span
              className={cn(
                "grid size-6 shrink-0 place-items-center border font-mono text-[0.6rem]",
                state === "active" && "border-acid bg-acid text-void",
                state === "done" && "border-acid/50 text-acid",
                state === "todo" && "border-edge text-ash"
              )}
            >
              {state === "done" ? (
                <Check className="size-3" strokeWidth={3} />
              ) : (
                s.index
              )}
            </span>
            <span
              className={cn(
                "hidden text-[0.62rem] font-medium tracking-[0.16em] uppercase sm:block",
                state === "todo" ? "text-ash" : "text-bone"
              )}
            >
              {s.title}
            </span>
            {index < BOOKING_STEPS.length - 1 ? (
              <span
                className={cn(
                  "h-px flex-1",
                  index < activeIndex ? "bg-acid/50" : "bg-edge"
                )}
              />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

interface OptionCardProps {
  readonly selected: boolean;
  readonly onClick: () => void;
  readonly children: React.ReactNode;
  readonly className?: string;
}

function OptionCard({
  selected,
  onClick,
  children,
  className,
}: OptionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group/opt relative w-full border p-4 text-left transition-all duration-300",
        selected
          ? "border-acid bg-acid/[0.06]"
          : "border-edge hover:border-edge-strong hover:bg-carbon",
        className
      )}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          "absolute top-3 right-3 grid size-5 place-items-center border transition-all",
          selected
            ? "border-acid bg-acid text-void"
            : "border-edge text-transparent"
        )}
      >
        <Check className="size-3" strokeWidth={3} />
      </span>
    </button>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p role="alert" className="text-plasma mt-3 font-mono text-xs">
      {message}
    </p>
  );
}

function ServiceStep({
  value,
  error,
  onSelect,
}: {
  value: string;
  error?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-ash mb-4 font-mono text-xs tracking-[0.16em] uppercase">
        ¿Qué te vas a hacer?
      </legend>
      <div className="grid gap-3">
        {SERVICES.map((service) => (
          <OptionCard
            key={service.id}
            selected={value === service.id}
            onClick={() => onSelect(service.id)}
          >
            <div className="flex items-baseline justify-between gap-4 pr-8">
              <span className="font-display text-lg leading-none uppercase">
                {service.name}
              </span>
            </div>
            <div className="text-bone-dim mt-2 flex items-center gap-3 font-mono text-xs">
              <span className="text-acid">{formatCop(service.priceCop)}</span>
              <span className="text-edge-strong">/</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="size-3" strokeWidth={2} />
                {formatDuration(service.durationMinutes)}
              </span>
            </div>
          </OptionCard>
        ))}
      </div>
      <FieldError message={error} />
    </fieldset>
  );
}

function BarberStep({
  value,
  error,
  onSelect,
}: {
  value: string;
  error?: string;
  onSelect: (id: string) => void;
}) {
  return (
    <fieldset>
      <legend className="text-ash mb-4 font-mono text-xs tracking-[0.16em] uppercase">
        ¿Con quién?
      </legend>
      <div className="grid gap-3">
        {BARBERS.map((barber) => (
          <OptionCard
            key={barber.id}
            selected={value === barber.id}
            onClick={() => onSelect(barber.id)}
          >
            <div className="pr-8">
              <span className="font-display text-lg leading-none uppercase">
                {barber.alias}
              </span>
              <p className="text-bone-dim mt-1.5 font-mono text-xs">
                {barber.specialty} · {barber.signatureMove}
              </p>
            </div>
          </OptionCard>
        ))}
        <OptionCard
          selected={value === NO_PREFERENCE_BARBER}
          onClick={() => onSelect(NO_PREFERENCE_BARBER)}
        >
          <span className="font-display text-lg leading-none uppercase">
            Sin preferencia
          </span>
          <p className="text-bone-dim mt-1.5 pr-8 font-mono text-xs">
            Te asignamos al artista disponible con mejor match.
          </p>
        </OptionCard>
      </div>
      <FieldError message={error} />
    </fieldset>
  );
}

function ScheduleStep({
  days,
  dayValue,
  slotValue,
  dayError,
  slotError,
  onSelectDay,
  onSelectSlot,
}: {
  days: readonly DayOption[];
  dayValue: string;
  slotValue: string;
  dayError?: string;
  slotError?: string;
  onSelectDay: (id: string) => void;
  onSelectSlot: (id: string) => void;
}) {
  const periods = ["Mañana", "Tarde", "Noche"] as const;
  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="text-ash mb-4 font-mono text-xs tracking-[0.16em] uppercase">
          Elige el día
        </legend>
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
          {days.map((day) => {
            const selected = dayValue === day.id;
            return (
              <button
                key={day.id}
                type="button"
                aria-pressed={selected}
                onClick={() => onSelectDay(day.id)}
                className={cn(
                  "flex flex-col items-center gap-0.5 border py-3 transition-all duration-300",
                  selected
                    ? "border-acid bg-acid/[0.06] text-bone"
                    : "border-edge text-bone-dim hover:border-edge-strong"
                )}
              >
                <span className="font-mono text-[0.6rem] tracking-widest uppercase">
                  {day.weekday}
                </span>
                <span className="font-display text-xl leading-none">
                  {day.dayNum}
                </span>
                <span className="text-ash font-mono text-[0.6rem] tracking-widest uppercase">
                  {day.month}
                </span>
              </button>
            );
          })}
        </div>
        <FieldError message={dayError} />
      </fieldset>

      <fieldset>
        <legend className="text-ash mb-4 font-mono text-xs tracking-[0.16em] uppercase">
          Elige la hora
        </legend>
        <div className="flex flex-col gap-4">
          {periods.map((period) => (
            <div key={period}>
              <p className="text-ash mb-2 font-mono text-[0.62rem] tracking-[0.2em] uppercase">
                {period}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {TIME_SLOTS.filter((slot) => slot.period === period).map(
                  (slot) => {
                    const selected = slotValue === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => onSelectSlot(slot.id)}
                        className={cn(
                          "border py-2.5 font-mono text-sm transition-all duration-300",
                          selected
                            ? "border-acid bg-acid text-void"
                            : "border-edge text-bone-dim hover:border-edge-strong hover:text-bone"
                        )}
                      >
                        {slot.label}
                      </button>
                    );
                  }
                )}
              </div>
            </div>
          ))}
        </div>
        <FieldError message={slotError} />
      </fieldset>
    </div>
  );
}

function DetailsStep({
  register,
  errors,
}: {
  register: UseFormRegister<BookingValues>;
  errors: FieldErrors<BookingValues>;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <label
          htmlFor="booking-name"
          className="text-ash mb-2 block font-mono text-xs tracking-[0.16em] uppercase"
        >
          Nombre
        </label>
        <input
          id="booking-name"
          type="text"
          autoComplete="name"
          maxLength={60}
          placeholder="¿Cómo te llamas?"
          className="border-edge bg-carbon text-bone placeholder:text-ash focus:border-acid w-full border px-4 py-3 focus:outline-none"
          {...register("name")}
        />
        <FieldError message={errors.name?.message} />
      </div>

      <div>
        <label
          htmlFor="booking-phone"
          className="text-ash mb-2 block font-mono text-xs tracking-[0.16em] uppercase"
        >
          WhatsApp
        </label>
        <input
          id="booking-phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          maxLength={17}
          placeholder="300 123 4567"
          className="border-edge bg-carbon text-bone placeholder:text-ash focus:border-acid w-full border px-4 py-3 focus:outline-none"
          {...register("phone")}
        />
        <FieldError message={errors.phone?.message} />
      </div>

      <div>
        <label
          htmlFor="booking-notes"
          className="text-ash mb-2 block font-mono text-xs tracking-[0.16em] uppercase"
        >
          Notas <span className="text-ash/60">(opcional)</span>
        </label>
        <textarea
          id="booking-notes"
          rows={3}
          maxLength={240}
          placeholder="Referencias, alergias, lo que sea."
          className="border-edge bg-carbon text-bone placeholder:text-ash focus:border-acid w-full resize-none border px-4 py-3 focus:outline-none"
          {...register("notes")}
        />
        <FieldError message={errors.notes?.message} />
      </div>
    </div>
  );
}

function ConfirmationScreen({
  serviceName,
  barberAlias,
  dayLabel,
  slotLabel,
  whatsappUrl,
  onClose,
}: {
  serviceName: string;
  barberAlias: string;
  dayLabel: string;
  slotLabel: string;
  whatsappUrl: string;
  onClose: () => void;
}) {
  const summary = [
    { label: "Servicio", value: serviceName },
    { label: "Barbero", value: barberAlias },
    { label: "Día", value: dayLabel },
    { label: "Hora", value: slotLabel },
  ];

  return (
    <div className="flex min-h-0 flex-1 flex-col justify-between overflow-y-auto px-6 py-8 sm:px-8">
      <div>
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="border-acid bg-acid/[0.08] grid size-16 place-items-center border"
        >
          <Check className="text-acid size-8" strokeWidth={2.5} />
        </motion.div>

        <p className="text-bone-dim mt-6 max-w-sm text-lg text-balance">
          Tu silla está apartada. Confírmala por WhatsApp y la dejamos sellada —
          es una cortesía llegar cinco minutos antes.
        </p>

        <dl className="divide-edge border-edge mt-8 divide-y border-y">
          {summary.map((row) => (
            <div
              key={row.label}
              className="flex items-center justify-between gap-4 py-3.5"
            >
              <dt className="text-ash font-mono text-xs tracking-[0.16em] uppercase">
                {row.label}
              </dt>
              <dd className="text-bone text-right font-medium">{row.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 flex flex-col gap-3">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClass({ size: "lg", className: "w-full" })}
        >
          <MessageCircle className="size-4" strokeWidth={2.5} />
          Confirmar por WhatsApp
        </a>
        <button
          type="button"
          onClick={onClose}
          className={buttonClass({
            variant: "outline",
            className: "w-full",
          })}
        >
          Listo
        </button>
      </div>
    </div>
  );
}
