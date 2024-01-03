import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { EAS as EASDeployments } from "@/lib/eas/deployments";

export async function createClient(chainId: number) {

  // Get the EAS contract deployment details for the current chain.
  const deployment = EASDeployments.getDeployment(chainId);
  if (!deployment) {
    throw new Error(`Unsupported chain ID for EAS contract deployment: ${chainId}`);
  }

  const eas = new EAS(deployment.address);
  return eas;
}