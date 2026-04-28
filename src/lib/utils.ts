import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatInTimeZone } from "date-fns-tz";
import { fr } from "date-fns/locale";

const TZ = "Europe/Paris";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  iso: string | Date,
  pattern = "EEEE d MMMM yyyy"
): string {
  return formatInTimeZone(new Date(iso), TZ, pattern, { locale: fr });
}

export function formatDateTime(iso: string | Date): string {
  return formatInTimeZone(new Date(iso), TZ, "EEEE d MMMM yyyy 'à' HH'h'mm", {
    locale: fr,
  });
}

export function formatPrice(amount: number | undefined): string {
  if (amount === undefined || amount === null) return "";
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 0,
  }).format(amount);
}

export function formatDuration(minutes: number | undefined): string {
  if (!minutes) return "";
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h${m.toString().padStart(2, "0")}`;
}
