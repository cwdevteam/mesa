import 'server-only'
import type { Locale } from '@/../i18n.config'
import { Dictionary } from '@/dictionaries/types'

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () => import('@/dictionaries/en').then((module) => module.default),
  es: () => import('@/dictionaries/es').then((module) => module.default),
}

export const getDictionary = async (locale: Locale): Promise<Dictionary> =>
  dictionaries[locale]?.() ?? dictionaries.en()
