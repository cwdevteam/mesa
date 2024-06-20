"use client";

import { useRouter } from "next/navigation";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

type EASClientContextValue = null;

const EASClientContext = createContext<EASClientContextValue | undefined>(
  undefined
);

interface EASClientProviderProps {
  children: React.ReactNode;
}

export const EASClientProvider = ({ children }: EASClientProviderProps) => {
  const [easClient, setEASClient] = useState<EASClientContextValue>(null);
  const { push } = useRouter();
  const { isConnected } = useAccount();

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <EASClientContext.Provider value={easClient}>
      {children}
    </EASClientContext.Provider>
  );
};

export const useEASClient = (): EASClientContextValue => {
  const context = useContext(EASClientContext);
  if (typeof context === "undefined") {
    throw new Error("useEASClient must be used within a EASClientProvider");
  }
  return context;
};

export default EASClientProvider;
