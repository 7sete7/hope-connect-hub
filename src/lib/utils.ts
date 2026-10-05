import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Monta o link do Instagram a partir de "@perfil", "perfil" ou de uma URL completa */
export function instagramUrl(value: string): string {
  const v = value.trim();
  if (/^https?:\/\//i.test(v)) return v;
  if (/^(www\.)?instagram\.com\//i.test(v)) return `https://${v}`;
  return `https://instagram.com/${v.replace(/^@/, '')}`;
}

/** Formata telefone brasileiro para exibição: "5551997602948" → "(51) 99760-2948" */
export function formatBrPhone(value: string): string {
  const d = value.replace(/\D/g, '').replace(/^55(?=\d{10,11}$)/, '');
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return value;
}
