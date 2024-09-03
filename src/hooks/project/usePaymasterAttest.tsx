import { usePaymasterProvider } from '@/context/Paymasters'
import { useProjectProvider } from '@/context/ProjectProvider'
import easAttest from '@/lib/eas/attest'
import getAttestArgs from '@/lib/eas/getAttestArgs'
import getEncodedAttestationData from '@/lib/eas/getEncodedAttestationData'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useWriteContracts } from 'wagmi/experimental'
import useProjectCreateRedirect from './useProjectCreateRedirect'
import { useAccount, useSwitchChain } from 'wagmi'
import { CHAIN } from '@/lib/consts'
import useConnectSmartWallet from '../useConnectSmartWallet'
import { ContractType, UserRole } from '@/types/projectMetadataForm'
import { useUserProvider } from '@/context/UserProvider'

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
  } = useProjectProvider()
  const { capabilities } = usePaymasterProvider()
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
        credits.push({
          contractType: ContractType.Songwriting,
          collaboratorType: UserRole.Owner,
          name: user?.full_name,
          splitBps: 10000,
          address,
        })

      const { uri: metadataUri } = await uploadJson({
        description,
        image,
        animation_url: animationUrl,
        external_url: externalUrl,
        credits,
      })
      const encodedAttestation = getEncodedAttestationData(
        name,
        metadataUri,
        [credits[0].name],
        [credits[0].address],
        []
      )
      const args = getAttestArgs(encodedAttestation, refUID)
      setCreatingStatus(true)

      const response = await easAttest(
        writeContractsAsync,
        capabilities,
        args,
        address
      )
      return response
    } catch (error) {
      return { error }
    }
  }

  return { attest }
}

export default usePaymasterAttest
