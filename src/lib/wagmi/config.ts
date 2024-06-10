import { http, createConfig } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";
import { CHAIN, CHAIN_ID, RPC } from "../consts";

const wagmiConfig = createConfig({
  chains: [CHAIN],
  // turn off injected provider discovery
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "mesa",
      preference: "smartWalletOnly",
    }),
  ],
  ssr: true,
  transports: {
    [CHAIN_ID]: http(RPC),
  } as any,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}

export default wagmiConfig
