import React from 'react'
import { formatDistanceToNow, format } from 'date-fns'
import { enUS, fr, de, es } from 'date-fns/locale'

export type DateFormatProps = {
  date: string
  lang: string
}

export const DateFormat = ({ date, lang }: DateFormatProps) => {
  const formatDate = (date: Date, lang: string) => {
    const now = new Date()
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)

    let locale
    switch (lang) {
      case 'en':
        locale = enUS
        break
      case 'es':
        locale = es
        break
      default:
        locale = enUS
    }

    if (date > oneWeekAgo) {
      return formatDistanceToNow(date, { addSuffix: true, locale })
    } else {
      return format(date, 'P', { locale })
    }
  }

  return <p>{formatDate(new Date(date), lang)}</p>
}
