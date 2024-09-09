import { Credit } from '@/types/projectMetadataForm'
import { useEffect, useState } from 'react'
import useAttestation from '../useAttestation'
import useProjectMedia from './useProjectMedia'
import { useAccount } from 'wagmi'
import { useMediaContext } from '@/context/MediaContext'

const useProject = () => {
  const { address } = useAccount()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [animationUrl, setAnimationUrl] = useState<string>('')
  const [externalUrl, setExternalUrl] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [ethPrice, setEthPrice] = useState<string>('')
  const [credits, setCredits] = useState<Credit[]>([])
  const [feeRecipient, setFeeRecipient] = useState(address)
  const {
    attestationData,
    dashboardData,
    loading: loadingAttestation,
  }: any = useAttestation()
  useProjectMedia(animationUrl, image, name)
  const { setMedias } = useMediaContext()
  const [creatingStatus, setCreatingStatus] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
  const [uploadingAudio, setUploadingAudio] = useState<boolean>(false)
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)
  const [refUID, setRefUID] = useState(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  )
  const fetchData = async () => {
    if (dashboardData) {
      setName(dashboardData['name'])
      setDescription(dashboardData['description'] || '')
      setCredits(dashboardData['credits'] || [])
      setAnimationUrl(dashboardData['animationUrl'] || '')
      if (!dashboardData['animationUrl']) setMedias([])
      setExternalUrl(dashboardData['externalUrl'] || '')
      setImage(dashboardData['image'] || '')
      setRefUID(dashboardData['refUID'])
    }
  }

  useEffect(() => {
    dashboardData && fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData])

  return {
    attestationData,
    credits,
    setCredits,
    name,
    setName,
    description,
    setDescription,
    animationUrl,
    setAnimationUrl,
    ethPrice,
    setEthPrice,
    image,
    setImage,
    setCreatingStatus,
    creatingStatus,
    refUID,
    loading: loadingAttestation,
    uploadingAudio,
    setUploadingAudio,
    uploadingImage,
    setUploadingImage,
    feeRecipient,
    setFeeRecipient,
    updating,
    setUpdating,
    externalUrl,
    setExternalUrl,
  }
}

export default useProject
