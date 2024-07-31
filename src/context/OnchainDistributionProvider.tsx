"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import useOnchainDistribution from "@/hooks/useOnchainDistribution";
import { OnchainDistributionProtocol } from "@/types/const";

const OnchainDistributionContext = createContext({} as any);

const OnchainDistributionProvider = ({
  children,
  protocol,
}: {
  children: ReactNode;
  protocol: OnchainDistributionProtocol;
}) => {
  const data = useOnchainDistribution(protocol);

  const value = useMemo(
    () => ({
      ...data,
    }),
    [data]
  );

  return (
    <OnchainDistributionContext.Provider value={value}>
      {children}
    </OnchainDistributionContext.Provider>
  );
};

export const useOnchainDistributionProvider = () => {
  const context = useContext(OnchainDistributionContext);
  if (!context) {
    throw new Error(
      "useOnchainDistributionProvider must be used within a OnchainDistributionProvider"
    );
  }
  return context;
};

export default OnchainDistributionProvider;
