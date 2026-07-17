import { describe, expect, it } from "vitest";
import { cn, formatCop, formatDuration, sanitizeText } from "@/lib/utils";

describe("cn", () => {
  it("joins truthy fragments and drops falsy ones", () => {
    expect(cn("a", false, "b", null, undefined, "c")).toBe("a b c");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cn(false, null, undefined)).toBe("");
  });
});

describe("formatCop", () => {
  it("formats pesos without decimals", () => {
    // Non-breaking spaces vary by ICU build, so assert on the parts.
    const formatted = formatCop(75000);
    expect(formatted).toContain("$");
    expect(formatted).toContain("75.000");
    expect(formatted).not.toContain(",00");
  });

  it("groups thousands for six-figure prices", () => {
    expect(formatCop(210000)).toContain("210.000");
  });

  it("handles zero", () => {
    expect(formatCop(0)).toContain("0");
  });
});

describe("formatDuration", () => {
  it("renders minutes under an hour", () => {
    expect(formatDuration(45)).toBe("45m");
  });

  it("renders whole hours without trailing minutes", () => {
    expect(formatDuration(120)).toBe("2h");
  });

  it("renders hours and minutes", () => {
    expect(formatDuration(90)).toBe("1h 30m");
  });
});

describe("sanitizeText", () => {
  it("strips angle brackets so markup cannot be injected", () => {
    expect(sanitizeText("<script>alert(1)</script>")).toBe(
      "scriptalert(1)/script"
    );
  });

  it("collapses runs of whitespace and trims", () => {
    expect(sanitizeText("  Juan   Sebastián  ")).toBe("Juan Sebastián");
  });

  it("collapses newlines and tabs into single spaces", () => {
    expect(sanitizeText("línea1\n\n\tlínea2")).toBe("línea1 línea2");
  });

  it("leaves clean input untouched", () => {
    expect(sanitizeText("Corte de Autor")).toBe("Corte de Autor");
  });
});
