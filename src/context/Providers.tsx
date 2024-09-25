import ThemeProvider from '@/context/ThemeProvider'
import WagmiProvider from './WagmiProvider'
import UserProvider from './UserProvider'
import MediaProvider from './MediaContext'
import ProjectProvider from './ProjectProvider'

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
          <UserProvider>
            <ProjectProvider>{children}</ProjectProvider>
          </UserProvider>
        </WagmiProvider>
      </MediaProvider>
    </ThemeProvider>
  )
}
