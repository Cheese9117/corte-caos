"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BookingDrawer } from "@/components/booking/BookingDrawer";

interface BookingContextValue {
  readonly isOpen: boolean;
  readonly preselectedServiceId: string | null;
  readonly open: (serviceId?: string) => void;
  readonly close: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preselectedServiceId, setPreselectedServiceId] = useState<
    string | null
  >(null);

  const open = useCallback((serviceId?: string) => {
    setPreselectedServiceId(serviceId ?? null);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<BookingContextValue>(
    () => ({ isOpen, preselectedServiceId, open, close }),
    [isOpen, preselectedServiceId, open, close]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingDrawer />
    </BookingContext.Provider>
  );
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking must be used within a BookingProvider.");
  }
  return context;
}
