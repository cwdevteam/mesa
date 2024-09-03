import { UserDetailsProps } from '@/types/const'
import { useCallback, useEffect, useState } from 'react'
import { fetchAttestation } from '@/lib/eas/fetchAttestation'
import useAttestationRead from '@/hooks/useAttestationRead'

const useAttestation = () => {
  const { attestationData, loading: reading }: any = useAttestationRead()
  const [dashboardData, setDashboardData] = useState<UserDetailsProps | null>(
    null
  )

  const fetchData = useCallback(async () => {
    if (attestationData?.length > 0) {
      let { dashboardData }: any = await fetchAttestation(attestationData)
      setDashboardData(dashboardData)
    }
  }, [attestationData])

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attestationData])

  return { attestationData, dashboardData, loading: reading }
}

export default useAttestation
