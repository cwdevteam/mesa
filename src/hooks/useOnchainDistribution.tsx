import { OnchainDistributionProtocol } from '@/types/const'
import useZoraSaleStrategy from './useZoraSaleStrategy'
import { useState } from 'react'

const useOnchainDistribution = (protocol: OnchainDistributionProtocol) => {
  const zoraSaleStrategy = useZoraSaleStrategy()
  const isZora = protocol === 'Zora'
  const isSound = protocol === 'Sound'
  const [activeSplit, setActiveSplit] = useState(true)

  return {
    isSound,
    isZora,
    protocol,
    activeSplit,
    setActiveSplit,
    ...zoraSaleStrategy,
  }
}

export default useOnchainDistribution
