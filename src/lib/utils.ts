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
