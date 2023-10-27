export const i18n = {
  defaultLocale: 'en',
  locales: ['en', 'es'],
  localeHeader: 'x-i18n-locale'
} as const

export type Locale = (typeof i18n)['locales'][number]

export default i18n
