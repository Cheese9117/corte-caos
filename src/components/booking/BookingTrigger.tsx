"use client";

import { ArrowUpRight } from "lucide-react";
import { useBooking } from "@/components/booking/BookingProvider";
import { buttonClass } from "@/components/ui/button-styles";

interface BookingTriggerProps {
  readonly serviceId?: string;
  readonly label?: string;
  readonly variant?: "primary" | "outline" | "ghost";
  readonly size?: "md" | "lg";
  readonly className?: string;
  readonly withIcon?: boolean;
}

/** CTA that opens the booking drawer, optionally preselecting a service. */
export function BookingTrigger({
  serviceId,
  label = "Agendar cita",
  variant = "primary",
  size = "md",
  className,
  withIcon = true,
}: BookingTriggerProps) {
  const { open } = useBooking();

  return (
    <button
      type="button"
      onClick={() => open(serviceId)}
      className={buttonClass({ variant, size, className })}
    >
      {label}
      {withIcon ? (
        <ArrowUpRight
          className="size-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
          strokeWidth={2.5}
        />
      ) : null}
    </button>
  );
}
