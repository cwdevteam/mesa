import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { Locale } from "@/../i18n.config";
import type { NextApiRequest } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const pathnameWithLocale = (locale: Locale, pathname: string) =>
  `/${locale}${pathname.startsWith("/") ? "" : "/"}${pathname}`;

export const getCookie = (req: NextApiRequest) => {
  return req.cookies[process.env.NEXT_PUBLIC_COOKIE || "mesa_session"] || "";
};
