'use client'

import wagmiConfig from '@/lib/wagmi/config'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'
import { WagmiProvider as WProvider } from 'wagmi'

const queryClient = new QueryClient()

const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WProvider config={wagmiConfig}>
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WProvider>
)

export default WagmiProvider
