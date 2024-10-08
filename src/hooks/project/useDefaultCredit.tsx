import { useProjectProvider } from '@/context/ProjectProvider'
import { useUserProvider } from '@/context/UserProvider'
import { ContractType, UserRole } from '@/types/projectMetadataForm'
import { useEffect } from 'react'
import { useAccount } from 'wagmi'

const useDefaultCredit = () => {
  const { address } = useAccount()
  const { user } = useUserProvider()
  const { credits, setCredits } = useProjectProvider()
  const hasFirstCredit = credits[0]?.name && credits[0]?.address

  useEffect(() => {
    if (!(user?.legal_name && address)) return
    if (hasFirstCredit) return
    setCredits([
      {
        contractType: ContractType.Songwriting,
        collaboratorType: UserRole.Owner,
        name: user.legal_name,
        splitBps: 10000,
        address,
      },
    ])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, address])
}

export default useDefaultCredit
