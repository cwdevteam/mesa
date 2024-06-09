import { Locale } from "@/../i18n.config";
import { getDictionary } from "@/lib/dictionary";
import LandingPage from "@/components/LandingPage";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const {
    home: { heroSection: dict },
  } = await getDictionary(lang);

  return <LandingPage dict={dict} />;
}
