'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWallet } from "@thirdweb-dev/react"
import { EASWithWallet, createClientWithMesaWallet } from "@/lib/eas/client"

type EASClientContextValue = EASWithWallet | null

const EASClientContext = createContext<EASClientContextValue | undefined>(undefined)

interface EASClientProviderProps {
  children: React.ReactNode
}

export const EASClientProvider = ({ children }: EASClientProviderProps) => {
  const wallet = useWallet()
  const [easClient, setEASClient] = useState<EASClientContextValue>(null)

  useEffect(() => {
    async function createEASClient() {
      if (wallet) {
        const eas = await createClientWithMesaWallet(wallet)
        setEASClient(eas)
      }
    }
    createEASClient()
  }, [wallet])

  return (
    <EASClientContext.Provider value={easClient}>
      {children}
    </EASClientContext.Provider>
  )
}

export const useEASClient = (): EASClientContextValue => {
  const context = useContext(EASClientContext)
  if (typeof context === 'undefined') {
    throw new Error('useEASClient must be used within a EASClientProvider')
  }
  return context
}

export default EASClientProvider