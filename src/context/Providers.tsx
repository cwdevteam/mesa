import env from '@/env'

import LocaleProvider from '@/context/LocaleContext'
import DictionaryProvider from '@/context/DictionaryContext'
import ThemeProvider from '@/context/ThemeProvider'

import { getDictionary } from '@/lib/dictionary'
import { Locale } from '@/../i18n.config'

import { Optimism } from "@thirdweb-dev/chains"
import { ThirdwebProvider } from '@/components/Thirdweb'

export default async function Providers({
  children,
  lang
}: {
  children: React.ReactNode,
  lang: Locale
}) {
  const dictionary = await getDictionary(lang)
  return (
    <LocaleProvider locale={lang}>
      <DictionaryProvider dictionary={dictionary}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThirdwebProvider
            activeChain={Optimism}
            supportedChains={[Optimism]}
            clientId={env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
          >
              {children}
          </ThirdwebProvider>
        </ThemeProvider>
      </DictionaryProvider>
    </LocaleProvider>
  )
}