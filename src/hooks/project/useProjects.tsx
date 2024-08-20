import { useEffect, useState } from 'react'
import { useAccount } from 'wagmi'
import { getProjects } from '@/lib/eas/getProjects'
import getFormattedAttestations from '@/lib/eas/getFormattedAttestations'

const useProjects = () => {
  const { address } = useAccount()
  const [attestations, setAttestations] = useState<any[]>([])

  useEffect(() => {
    const init = async () => {
      try {
        const queryParam = address ? `?address=${address}` : ''
        const response: any = await getProjects(queryParam)
        if (response?.error) return
        console.log("ZIAD", response)
        const decodedAttestations = getFormattedAttestations(response.data)
        setAttestations(decodedAttestations)
      } catch (error) {
        console.error('Failed to fetch attestations:', error)
      }
    }
    if (!address) return
    init()
  }, [address])

  return { projects: attestations }
}

export default useProjects
