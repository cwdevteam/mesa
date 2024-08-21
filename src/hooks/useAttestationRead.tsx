import { CHAIN_ID, EAS } from '@/lib/consts'
import { easAbi } from '@/lib/abi/eas'
import { useParams } from 'next/navigation'
import { ProjectIDType } from '@/types/const'
import { useEffect, useState } from 'react'
import { getPublicClient } from '@/lib/clients'

const useAttestationRead = () => {
  const { id } = useParams<ProjectIDType>()
  const [attestationData, setAttestationData] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      const publicClient = getPublicClient(CHAIN_ID)
      const response: any = await publicClient.readContract({
        address: EAS,
        abi: easAbi,
        functionName: 'getAttestation',
        args: [id],
      })

      setAttestationData(response)
      setLoading(false)
    }
    if (!id) return

    init()
  }, [id])

  return {
    attestationData,
    loading,
  }
}

export default useAttestationRead
