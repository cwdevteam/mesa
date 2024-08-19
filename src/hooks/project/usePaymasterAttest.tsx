import { usePaymasterProvider } from '@/context/Paymasters'
import { useProjectProvider } from '@/context/ProjectProvider'
import easAttest from '@/lib/eas/attest'
import getAttestArgs from '@/lib/eas/getAttestArgs'
import getEncodedAttestationData from '@/lib/eas/getEncodedAttestationData'
import { useParams } from 'next/navigation'
import { ProjectIDType } from '@/types/const'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import { useWriteContracts } from 'wagmi/experimental'
import useProjectCreateRedirect from './useProjectCreateRedirect'
import useDefaultCredit from './useDefaultCredit'

const usePaymasterAttest = () => {
  const { name, description, animationUrl, credits, image } =
    useProjectProvider()
  const { capabilities } = usePaymasterProvider()
  const { data: callsStatusId, writeContractsAsync } = useWriteContracts()
  const { id } = useParams<ProjectIDType>()
  useDefaultCredit()
  useProjectCreateRedirect(callsStatusId)

  const attest = async () => {
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
    const args = getAttestArgs(encodedAttestation, id)
    easAttest(writeContractsAsync, capabilities, args)
  }

  return { attest, callsStatusId }
}

export default usePaymasterAttest
