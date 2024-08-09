"use client";

import { useWriteContracts } from "wagmi/experimental";
import { usePaymasterProvider } from "@/context/Paymasters";

const useSoundCreatePaymasterEdition = () => {
  const { writeContractsAsync } = useWriteContracts();
  const { capabilities } = usePaymasterProvider();

  const createPaymasterEdition = async (input: any) => {
    await writeContractsAsync({
      contracts: [
        {
          ...input,
        },
      ],
      capabilities,
    });
  };

  return { createPaymasterEdition };
};

export default useSoundCreatePaymasterEdition;
