import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { Locale } from '@/../i18n.config'
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const pathnameWithLocale = (locale: Locale, pathname: string) => (
  `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`
)

export const bpsToPercent = (bps: number) => (
  `${(bps / 100).toFixed(2)}%`
)

export const formatTime = (time: number | undefined) => {
  if (time || time === 0) {
    const hours = Math.floor(time / 3600)
    const minutes = Math.floor((time % 3600) / 60)
    const seconds = Math.floor(time % 60)
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
      2,
      '0'
    )}:${String(seconds).padStart(2, '0')}`
  }
  return '00:00:00'
}
