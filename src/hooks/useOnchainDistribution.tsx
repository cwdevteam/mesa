import { OnchainDistributionProtocol } from '@/types/const'
import useZoraSaleStrategy from './useZoraSaleStrategy'

const useOnchainDistribution = (protocol: OnchainDistributionProtocol) => {
  const zoraSaleStrategy = useZoraSaleStrategy()
  const isZora = protocol === 'Zora'
  const isSound = protocol === 'Sound'

  return {
    isSound,
    isZora,
    protocol,
    ...zoraSaleStrategy,
  }
}

export default useOnchainDistribution
