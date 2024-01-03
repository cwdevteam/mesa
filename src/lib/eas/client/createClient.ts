import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { MesaWallet } from "@/lib/wallet/MesaWallet";
import { EAS as EASDeployments } from "@/lib/eas/deployments";
import { WalletInstance } from "@thirdweb-dev/react";
import { WalletV6 } from "@/lib/ethers/compat";

export class EASWithWallet extends EAS {
  wallet: WalletV6

  constructor(address: string, wallet: WalletV6) {
    super(address);
    this.wallet = wallet;
    this.connect(wallet)
    return this
  }

  getWallet() {
    return this.wallet;
  }
}

export async function createClientWithMesaWallet(wallet: WalletInstance) {
  if (!(wallet instanceof MesaWallet)) {
    throw new Error(`Expected MesaWallet. Found ${wallet.constructor.name}`);
  }

  // Get ethers v6 wallet
  const walletV6 = await wallet.getWalletV6();
  if (!walletV6) {
    throw new Error("Missing ethers wallet. Not connected?");
  }

  // Get the EAS contract deployment details for the current chain.
  const currentChainId = await wallet.getChainId();
  const deployment = EASDeployments.getDeployment(currentChainId);
  if (!deployment) {
    throw new Error(`Unsupported chain ID for EAS contract deployment: ${currentChainId}`);
  }

  // Return connected EAS SDK client.
  const eas = new EASWithWallet(deployment.address, walletV6);
  return eas;
}