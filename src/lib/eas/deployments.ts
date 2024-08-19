import Optimism from '@ethereum-attestation-service/eas-contracts/deployments/optimism/EAS.json'
import OptimismGoerli from '@ethereum-attestation-service/eas-contracts/deployments/optimism-goerli/EAS.json'

export const EAS = {
  Optimism,
  OptimismGoerli,
  getDeployment: (chainId: number) => {
    switch (chainId) {
      case 10:
        return Optimism
      case 420:
        return OptimismGoerli
      default:
        return null
    }
  },
} as const
