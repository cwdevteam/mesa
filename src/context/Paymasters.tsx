"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { PaymasterContextProps, PaymastersProviderProps } from "@/types/const";

const PaymasterContext = createContext<PaymasterContextProps | undefined>(
  undefined
);

const PaymasterProvider = ({ children }: PaymastersProviderProps) => {
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);
  const [error, setError] = useState<string | undefined>(undefined);

  const onSuccess = (id: string) => {
    setId(id);
    window?.location?.reload?.();
  };

  const { writeContracts } = useWriteContracts({
    mutation: {
      onSuccess,
      onError: (error: any) => {
        setId(error.message);
        setError(error.message);
      },
    },
  });

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
    <PaymasterContext.Provider
      value={{ writeContracts, capabilities, id, error }}
    >
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
