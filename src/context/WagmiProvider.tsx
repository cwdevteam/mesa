"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { WagmiProvider as WProvider, createConfig, http } from "wagmi";
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

const queryClient = new QueryClient();

const WagmiProvider = ({ children }: { children: ReactNode }) => (
  <WProvider config={wagmiConfig}>
    {" "}
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  </WProvider>
);

export default WagmiProvider;
