"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { PaymasterContextProps, PaymastersProviderProps } from "@/types/const";
import { useRouter } from "next/navigation";
import {
  WriteContractsData,
  WriteContractsVariables,
} from "@wagmi/core/experimental";

const PaymasterContext = createContext<PaymasterContextProps | undefined>(
  undefined
);

const PaymasterProvider = ({ children }: PaymastersProviderProps) => {
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });

  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return {};
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain["paymasterService"] &&
      capabilitiesForChain["paymasterService"].supported
    ) {
      return {
        paymasterService: {
          url: process.env.NEXT_PUBLIC_PAYMASTER_SERVICE_URL,
        },
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  return (
    <PaymasterContext.Provider value={{ capabilities, id, error }}>
      {children}
    </PaymasterContext.Provider>
  );
};

const usePaymasterProvider = () => {
  const context = useContext(PaymasterContext);
  if (!context) {
    throw new Error("usePaymaster must be used within a PaymasterProvider");
  }
  return context;
};

export { PaymasterProvider, usePaymasterProvider };
