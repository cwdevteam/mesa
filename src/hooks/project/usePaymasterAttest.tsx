import { usePaymasterProvider } from '@/context/Paymasters'
import { useProjectProvider } from '@/context/ProjectProvider'
import easAttest from '@/lib/eas/attest'
import getAttestArgs from '@/lib/eas/getAttestArgs'
import getEncodedAttestationData from '@/lib/eas/getEncodedAttestationData'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useWriteContracts } from 'wagmi/experimental'
import useProjectCreateRedirect from './useProjectCreateRedirect'
import useDefaultCredit from './useDefaultCredit'
import { useAccount, useSwitchChain } from 'wagmi'
import { CHAIN } from '@/lib/consts'
import useConnectSmartWallet from '../useConnectSmartWallet'

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
  useDefaultCredit()
  useProjectCreateRedirect(callsStatusId)
  const { switchChainAsync } = useSwitchChain()
  const { address } = useAccount()
  const { connect } = useConnectSmartWallet()

  const attest = async () => {
    try {
      if (!address) {
        connect()
        return
      }
      await switchChainAsync({ chainId: CHAIN.id })
      const { uri: metadataUri } = await uploadJson({
        description,
        image,
        animation_url: animationUrl,
        external_url: externalUrl,
        credits,
      })
      const author = credits.map((credit: any) => credit.name)
      const authorAddresses = credits.map((credit: any) => credit.address)

      const encodedAttestation = getEncodedAttestationData(
        name,
        metadataUri,
        author,
        authorAddresses,
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
