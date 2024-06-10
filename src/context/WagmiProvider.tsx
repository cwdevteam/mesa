"use client";

import wagmiConfig from "@/lib/wagmi/config";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { WagmiProvider as WProvider } from "wagmi";

const WagmiProvider = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WProvider>
  );
};

export default WagmiProvider;
