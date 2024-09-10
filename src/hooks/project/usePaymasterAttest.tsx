import { usePaymasterProvider } from '@/context/Paymasters'
import { useProjectProvider } from '@/context/ProjectProvider'
import easAttest from '@/lib/eas/attest'
import getAttestArgs from '@/lib/eas/getAttestArgs'
import getEncodedAttestationData from '@/lib/eas/getEncodedAttestationData'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useWriteContracts } from 'wagmi/experimental'
import useProjectCreateRedirect from './useProjectCreateRedirect'
import { useAccount, useSwitchChain, useWriteContract } from 'wagmi'
import { CHAIN } from '@/lib/consts'
import useConnectSmartWallet from '../useConnectSmartWallet'
import { ContractType, UserRole } from '@/types/projectMetadataForm'
import { useUserProvider } from '@/context/UserProvider'
import { stringToBytes } from 'viem'

const usePaymasterAttest = () => {
  const {
    name,
    description,
    animationUrl,
    credits,
    image,
    setCreatingStatus,
    refUID,
    externalUrl,
    contentHashes,
  } = useProjectProvider()
  const { capabilities } = usePaymasterProvider()
  const { writeContractAsync } = useWriteContract()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  useProjectCreateRedirect(callsStatusId)
  const { switchChainAsync } = useSwitchChain()
  const { address } = useAccount()
  const { connect } = useConnectSmartWallet()
  const { user } = useUserProvider()

  const attest = async () => {
    try {
      if (!address) {
        connect()
        return
      }
      await switchChainAsync({ chainId: CHAIN.id })
      if (!credits.length)
        credits.push(
          {
            contractType: ContractType.Songwriting,
            collaboratorType: UserRole.Owner,
            name: user?.legal_name,
            splitBps: 5000,
            address,
          },
          {
            contractType: ContractType.Master,
            collaboratorType: UserRole.Owner,
            name: user?.legal_name,
            splitBps: 5000,
            address,
          }
        )

      const { uri: metadataUri } = await uploadJson({
        description,
        image,
        animation_url: animationUrl,
        external_url: externalUrl,
        credits,
      })
      const authors = credits.map((credit: any) => credit.name)
      const authorAddresses = credits.map((credit: any) => credit.address)
      const hashes = contentHashes.map((hash: string) =>
        stringToBytes(hash.replaceAll('ipfs://', ''))
      )
      const encodedAttestation = getEncodedAttestationData(
        name,
        metadataUri,
        authors,
        authorAddresses,
        hashes
      )
      const args = getAttestArgs(encodedAttestation, refUID)
      setCreatingStatus(true)

      const response = await easAttest(
        writeContractAsync,
        capabilities,
        args,
        address
      )
      return response
    } catch (error) {
      console.error(error)
      return { error }
    }
  }

  return { attest }
}

export default usePaymasterAttest
