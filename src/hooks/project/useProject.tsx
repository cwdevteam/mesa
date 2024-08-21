import { Credit } from '@/types/projectMetadataForm'
import { useEffect, useState } from 'react'
import useAttestation from '../useAttestation'
import useProjectMedia from './useProjectMedia'
import { REFERRAL_RECIPIENT } from '@/lib/consts'

const useProject = () => {
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [animationUrl, setAnimationUrl] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [ethPrice, setEthPrice] = useState<string>('')
  const [credits, setCredits] = useState<Credit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [feeRecipient, setFeeRecipient] = useState(REFERRAL_RECIPIENT)
  const {
    attestationData,
    dashboardData,
    loading: loadingAttestation,
  }: any = useAttestation()
  useProjectMedia(animationUrl, image, name)
  const [creatingStatus, setCreatingStatus] = useState<boolean>(false)
  const [uploadingAudio, setUploadingAudio] = useState<boolean>(false)
  const [uploadingImage, setUploadingImage] = useState<boolean>(false)
  const [refUID, setRefUID] = useState(
    '0x0000000000000000000000000000000000000000000000000000000000000000'
  )
  const fetchData = async () => {
    setLoading(true)
    if (dashboardData) {
      setName(dashboardData['name'])
      setDescription(dashboardData['description'])
      setCredits(dashboardData['credits'])
      setAnimationUrl(dashboardData['animationUrl'] || '')
      setImage(dashboardData['image'] || '')
      setRefUID(dashboardData['refUID'])
    }
    setLoading(false)
  }

  useEffect(() => {
    dashboardData && loading && fetchData()
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
    loading: loading || loadingAttestation,
    uploadingAudio,
    setUploadingAudio,
    uploadingImage,
    setUploadingImage,
    feeRecipient,
    setFeeRecipient,
  }
}

export default useProject
