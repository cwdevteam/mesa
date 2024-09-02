import { getDictionary } from '@/lib/dictionary'
import LandingPage from '@/components/LandingPage'

export default async function Home() {
  const {
    home: { heroSection: dict },
  } = await getDictionary('en')

  return <LandingPage dict={dict} />
}
