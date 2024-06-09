import { useMemo } from 'react'
import type { Account, Chain, Client, Transport } from 'viem'
import { Config, useConnectorClient } from 'wagmi'
import { clientToProvider } from './useEthersProvider'

export function clientToSigner(client: Client<Transport, Chain, Account>) {
  const { account } = client
  const provider = clientToProvider(client)
  const signer = (provider as any).getSigner(account.address)
  return signer
}

/** Hook to convert a Viem Client to an ethers.js Signer. */
export function useEthersSigner({ chainId }: { chainId?: number } = {}) {
  const { data: client } = useConnectorClient<Config>({ chainId })
  return useMemo(() => (client ? clientToSigner(client as any) : undefined), [client])
}