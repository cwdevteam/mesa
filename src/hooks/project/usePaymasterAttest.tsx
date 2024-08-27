import { usePaymasterProvider } from '@/context/Paymasters'
import { useProjectProvider } from '@/context/ProjectProvider'
import easAttest from '@/lib/eas/attest'
import getAttestArgs from '@/lib/eas/getAttestArgs'
import getEncodedAttestationData from '@/lib/eas/getEncodedAttestationData'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useWriteContracts } from 'wagmi/experimental'
import useProjectCreateRedirect from './useProjectCreateRedirect'
import useDefaultCredit from './useDefaultCredit'

const usePaymasterAttest = () => {
  const {
    name,
    description,
    animationUrl,
    credits,
    image,
    setCreatingStatus,
    refUID,
  } = useProjectProvider()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  useDefaultCredit()
  useProjectCreateRedirect(callsStatusId)

  const attest = async (newCredit: any = null) => {
    try {
      let newCredits = credits
      if (newCredits) newCredits = credits.concat(newCredit)

      const { uri: metadataUri } = await uploadJson({
        description,
        image,
        animation_url: animationUrl,
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
      const response = await easAttest(writeContractsAsync, capabilities, args)
      return response
    } catch (error) {
      return { error }
    }
  }

  return { attest }
}

export default usePaymasterAttest
