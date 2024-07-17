import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/../i18n.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathnameWithLocale = (locale: Locale, pathname: string) =>
  `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;
