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

/**
 * Format relatif élégant : "Demain · 20h", "Samedi · 14h30", "Dans 3 semaines"
 * Si la date est trop loin (>30 jours), retourne le format date long.
 */
export function formatRelative(iso: string | Date): string {
  const date = new Date(iso);
  const now = new Date();
  const diffMs = date.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return formatInTimeZone(date, TZ, "d MMM", { locale: fr });
  if (diffDays === 0) {
    return "Aujourd'hui · " + formatInTimeZone(date, TZ, "HH'h'mm", { locale: fr });
  }
  if (diffDays === 1) {
    return "Demain · " + formatInTimeZone(date, TZ, "HH'h'mm", { locale: fr });
  }
  if (diffDays < 7) {
    return formatInTimeZone(date, TZ, "EEEE · HH'h'mm", { locale: fr });
  }
  return formatInTimeZone(date, TZ, "EEE d MMM", { locale: fr });
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
