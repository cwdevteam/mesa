import ThemeProvider from '@/context/ThemeProvider'
import WagmiProvider from './WagmiProvider'
import UserProvider from './UserProvider'
import MediaProvider from './MediaContext'

export default async function Providers({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <MediaProvider>
        <WagmiProvider>
          <UserProvider>{children}</UserProvider>
        </WagmiProvider>
      </MediaProvider>
    </ThemeProvider>
  )
}
