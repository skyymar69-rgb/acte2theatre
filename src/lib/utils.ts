import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(
  iso: string | Date,
  pattern = "EEEE d MMMM yyyy"
): string {
  return format(new Date(iso), pattern, { locale: fr });
}

export function formatDateTime(iso: string | Date): string {
  return format(new Date(iso), "EEEE d MMMM yyyy 'à' HH'h'mm", { locale: fr });
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
