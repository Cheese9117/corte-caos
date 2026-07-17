import { describe, expect, it } from "vitest";
import {
  BOOKING_STEPS,
  bookingSchema,
  type BookingValues,
} from "@/components/booking/schema";

const validBooking: BookingValues = {
  serviceId: "corte-autor",
  barberId: "el-cirujano",
  day: "2026-07-17",
  slotId: "t-0900",
  name: "Juan Sebastián",
  phone: "300 214 0099",
  notes: "",
};

describe("bookingSchema", () => {
  it("accepts a complete booking", () => {
    expect(bookingSchema.safeParse(validBooking).success).toBe(true);
  });

  it("requires every selection step", () => {
    const fields = ["serviceId", "barberId", "day", "slotId"] as const;
    for (const field of fields) {
      const result = bookingSchema.safeParse({ ...validBooking, [field]: "" });
      expect(result.success, `${field} should be required`).toBe(false);
    }
  });

  describe("phone", () => {
    it.each([
      "3002140099",
      "300 214 0099",
      "+573002140099",
      "+57 300 214 0099",
      "573002140099",
    ])("accepts Colombian mobile %s", (phone) => {
      expect(bookingSchema.safeParse({ ...validBooking, phone }).success).toBe(
        true
      );
    });

    it.each([
      ["", "empty"],
      ["300214009", "too short"],
      ["30021400990", "too long"],
      ["6042140099", "landline, not a 3xx mobile"],
      ["abcdefghij", "not numeric"],
      ["+13002140099", "wrong country code"],
    ])("rejects %s (%s)", (phone) => {
      expect(bookingSchema.safeParse({ ...validBooking, phone }).success).toBe(
        false
      );
    });
  });

  describe("name", () => {
    it("rejects a single character", () => {
      expect(
        bookingSchema.safeParse({ ...validBooking, name: "J" }).success
      ).toBe(false);
    });

    it("rejects names over 60 characters", () => {
      expect(
        bookingSchema.safeParse({ ...validBooking, name: "a".repeat(61) })
          .success
      ).toBe(false);
    });

    it("trims surrounding whitespace", () => {
      const result = bookingSchema.safeParse({
        ...validBooking,
        name: "  Juan  ",
      });
      expect(result.success && result.data.name).toBe("Juan");
    });
  });

  describe("notes", () => {
    it("are optional", () => {
      const { serviceId, barberId, day, slotId, name, phone } = validBooking;
      expect(
        bookingSchema.safeParse({
          serviceId,
          barberId,
          day,
          slotId,
          name,
          phone,
        }).success
      ).toBe(true);
    });

    it("reject content over 240 characters", () => {
      expect(
        bookingSchema.safeParse({ ...validBooking, notes: "a".repeat(241) })
          .success
      ).toBe(false);
    });
  });
});

describe("BOOKING_STEPS", () => {
  it("covers every field of the schema across its steps", () => {
    const stepFields = BOOKING_STEPS.flatMap((step) => step.fields);
    const schemaFields = Object.keys(bookingSchema.shape);
    expect([...stepFields].sort()).toEqual(schemaFields.sort());
  });

  it("has unique, sequentially numbered steps", () => {
    expect(BOOKING_STEPS.map((s) => s.index)).toEqual(["01", "02", "03", "04"]);
    expect(new Set(BOOKING_STEPS.map((s) => s.id)).size).toBe(
      BOOKING_STEPS.length
    );
  });
});
