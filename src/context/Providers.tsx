import env from "@/env";

import LocaleProvider from "@/context/LocaleContext";
import DictionaryProvider from "@/context/DictionaryContext";
import ThemeProvider from "@/context/ThemeProvider";

import { getDictionary } from "@/lib/dictionary";
import { Locale } from "@/../i18n.config";
import EASClientProvider from "./EASClientProvider";

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
          <EASClientProvider>{children}</EASClientProvider>
        </ThemeProvider>
      </DictionaryProvider>
    </LocaleProvider>
  );
}
