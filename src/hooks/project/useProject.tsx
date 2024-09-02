import { Credit } from '@/types/projectMetadataForm'
import { useEffect, useState } from 'react'
import useAttestation from '../useAttestation'
import useProjectMedia from './useProjectMedia'
import { useAccount } from 'wagmi'

const useProject = () => {
  const { address } = useAccount()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [animationUrl, setAnimationUrl] = useState<string>('')
  const [externalUrl, setExternalUrl] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [ethPrice, setEthPrice] = useState<string>('')
  const [credits, setCredits] = useState<Credit[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [activeSplit, setActiveSplit] = useState(true)
  const [feeRecipient, setFeeRecipient] = useState(address)
  const [splits, setSplits] = useState<any[]>([])
  const [splitPercents, setSplitPercents] = useState<any[]>([])
  const {
    attestationData,
    dashboardData,
    loading: loadingAttestation,
  }: any = useAttestation()
  useProjectMedia(animationUrl, image, name)
  const [creatingStatus, setCreatingStatus] = useState<boolean>(false)
  const [updating, setUpdating] = useState<boolean>(false)
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
      setExternalUrl(dashboardData['externalUrl'] || '')
      setImage(dashboardData['image'] || '')
      setRefUID(dashboardData['refUID'])
    }
    setLoading(false)
  }

  const setSplit = (split: any) => {
    const temp = [...splits]
    temp.push(split)
    setSplits([...temp])
  }

  const removeSplit = (index: number) => {
    let temp = [...splits]
    temp.splice(index, 1)
    setSplits([...temp])
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
    updating,
    setUpdating,
    externalUrl,
    setExternalUrl,
    splits,
    setSplit,
    splitPercents,
    setSplitPercents,
    removeSplit,
    activeSplit,
    setActiveSplit
  }
}

export default useProject
