import fetchUserByAddress from '@/lib/supabase/user/fetchUserByAddress'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Address } from 'viem'
import { useAccount, useConnect } from 'wagmi'

const useAuthRedirect = () => {
  const { address, isConnected } = useAccount()
  const [isAuthorized, setIsAuthorized] = useState<any>(null)
  const { push } = useRouter()
  const pathname = usePathname()
  const { connectors } = useConnect()
  const coinbaseWalletConnector = connectors?.find(
    (connector) => connector.id === 'coinbaseWalletSDK'
  )

  useEffect(() => {
    const init = async () => {
      const authorized = await coinbaseWalletConnector?.isAuthorized()
      setIsAuthorized(authorized)
    }

    if (!coinbaseWalletConnector) return
    init()
  }, [coinbaseWalletConnector])

  useEffect(() => {
    const checkUser = async () => {
      const responseLib = await fetchUserByAddress(address as Address)
      if (pathname.includes('/invite')) return
      if (pathname.endsWith('/create')) return
      if (!responseLib) return push('/profile')
      if (pathname === '/') push('/dashboard')
    }

    if (isAuthorized === null) return

    if (!(isAuthorized && address && isConnected)) {
      if (pathname.includes('/invite')) return
      push('/')
      return
    }
    checkUser()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized, address, isConnected])
}

export default useAuthRedirect
