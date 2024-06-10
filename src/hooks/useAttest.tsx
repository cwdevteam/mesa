import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { CHAIN, EAS, RPC } from "@/lib/consts";
import { useCapabilities, useWriteContracts } from "wagmi/experimental";
import { useMemo, useState } from "react";
import { easAbi } from "@/lib/abi/eas";

const useAttest = () => {
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
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
          url: `${document.location.origin}/api/paymaster`,
        },
      };
    }
    return {};
  }, [availableCapabilities]);
  console.log("SWEETS capabilities", capabilities);

  const attest = async (title: string, metadata: string) => {
    console.log("SWEETS ATTEST", title, metadata);
    const encodedAttestation = getEncodedAttestationData(
      title,
      metadata,
      [],
      [account.address as Address],
      []
    );
    const args = getAttestArgs(encodedAttestation);
    console.log("SWEETS args", args);

    writeContracts({
      contracts: [
        {
          address: EAS,
          abi: easAbi as any,
          functionName: "attest",
          args,
        },
      ],
      capabilities,
    });
  };

  return { attest, id };
};

export default useAttest;
