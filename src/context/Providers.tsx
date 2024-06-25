import LocaleProvider from "@/context/LocaleContext";
import DictionaryProvider from "@/context/DictionaryContext";
import ThemeProvider from "@/context/ThemeProvider";

import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/../i18n.config";
import EASClientProvider from "./EASClientProvider";
import WagmiProvider from "./WagmiProvider";
import { UserProvider } from "./UserProvider";

export default async function Providers({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: Locale;
}) {
  const dictionary = await getDictionary(lang);
  return (
    <LocaleProvider locale={lang}>
      <DictionaryProvider dictionary={dictionary}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <WagmiProvider>
            <UserProvider>
              <EASClientProvider>{children}</EASClientProvider>
            </UserProvider>
          </WagmiProvider>
        </ThemeProvider>
      </DictionaryProvider>
    </LocaleProvider>
  );
}
