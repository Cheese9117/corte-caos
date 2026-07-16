export interface Service {
  readonly id: string;
  readonly index: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly durationMinutes: number;
  readonly priceCop: number;
  readonly image: string;
  readonly signature?: boolean;
}

export interface Barber {
  readonly id: string;
  readonly alias: string;
  readonly realName: string;
  readonly specialty: string;
  readonly bio: string;
  readonly image: string;
  readonly signatureMove: string;
}

export interface GalleryShot {
  readonly id: string;
  readonly image: string;
  readonly caption: string;
  readonly span: "tall" | "wide" | "square";
}

export interface TimeSlot {
  readonly id: string;
  readonly label: string;
  readonly period: "Mañana" | "Tarde" | "Noche";
}

export interface OperatingDay {
  readonly day: string;
  readonly hours: string;
  readonly closed?: boolean;
}
