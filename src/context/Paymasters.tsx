"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useMemo,
  useState
} from "react";
import { useAccount } from "wagmi";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";

export interface PaymastersProps {
  children: ReactNode;
}

interface PaymasterContextProps {
  writeContracts: any;
  capabilities: any;
  id: string | undefined;
}

const PaymasterContext = createContext<PaymasterContextProps | undefined>(
  undefined
);

const PaymasterProvider = ({ children }: PaymastersProps) => {
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);

  const { writeContracts } = useWriteContracts({
    mutation: {
      onSuccess: (id: string) => setId(id),
      onError: (error: any) => setId(error.message)
    }
  });

  const { data: availableCapabilities } = useCapabilities({
    account: account.address
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
          url: process.env.NEXT_PUBLIC_PAYMASTER_SERVICE_URL
        }
      };
    }
    return {};
  }, [availableCapabilities, account.chainId]);

  return (
    <PaymasterContext.Provider value={{ writeContracts, capabilities, id }}>
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
