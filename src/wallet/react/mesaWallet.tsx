import { WalletConfig } from "@thirdweb-dev/react";
import { WalletOptions, createAsyncLocalStorage} from "@thirdweb-dev/wallets";

import { MesaWallet } from "@/wallet/MesaWallet"

export type MesaWalletConfigOptions = {
  walletId: string;
};

export type MesaWalletConfig = WalletConfig<MesaWallet>;

export const mesaWallet = (
  config: MesaWalletConfigOptions,
): MesaWalletConfig => {
  return {
    id: MesaWallet.id,
    isHeadless: true,
    meta: {
      ...MesaWallet.meta
    },
    create: (options: WalletOptions) => {
      // Use a unique storage key to support multiple wallets per device
      const name = `mesaWallet-${config.walletId}`
      const storage = createAsyncLocalStorage(name)
      return new MesaWallet({...config, ...options, storage})
    },
  };
};
