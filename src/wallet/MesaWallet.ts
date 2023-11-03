import { LocalWallet, LocalWalletOptions, WalletOptions } from "@thirdweb-dev/wallets";

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

}