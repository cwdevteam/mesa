import { LocalWallet, LocalWalletOptions, WalletOptions } from "@thirdweb-dev/wallets";
import { SignerV5, WalletV5, WalletV6, convertV5toV6Wallet } from '@/lib/ethers/compat'

export class MesaWallet extends LocalWallet {
  constructor(options?: WalletOptions<LocalWalletOptions>) {
    super(options);
  }

  static id = 'mesaWallet';

  static meta = {
    name: "Mesa Wallet",
    iconURL:
      "ipfs://QmbQzSNGvmNYZzem9jZRuYeLe9K2W4pqbdnVUp7Y6edQ8Y/local-wallet.svg",
  };

  getWalletV6 = async (): Promise<WalletV6 | null> => {
    const connector = await this.getConnector()
    const signer: SignerV5 = await connector.getSigner()
    const walletV5 = signer as WalletV5;
    if (walletV5 && walletV5.provider) {
      // TODO memoize result
      return convertV5toV6Wallet(walletV5)
    }

    console.log('Missing wallet or wallet provider. Not connected?')
    return null
  }
}