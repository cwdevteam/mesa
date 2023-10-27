'use client'

import React, { createContext, useContext, ReactNode } from 'react'
import { Locale } from '@/../i18n.config'

const LocaleContext = createContext<Locale | undefined>(undefined)

interface LocaleProviderProps {
  children: ReactNode
  locale: Locale
}

export const LocaleProvider = ({ children, locale }: LocaleProviderProps) => {
  return (
    <LocaleContext.Provider value={locale}>
      {children}
    </LocaleContext.Provider>
  )
}

export const useLocale = (): Locale => {
  const context = useContext(LocaleContext)
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider')
  }
  return context
}