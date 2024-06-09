import { createConfig, http } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

const wagmiConfig = createConfig({
    chains: [baseSepolia],
    connectors: [
      coinbaseWallet({
        appName: "mesa",
        preference: "smartWalletOnly",
      }),
    ],
    transports: {
      [baseSepolia.id]: http(),
    },
});

export default wagmiConfig