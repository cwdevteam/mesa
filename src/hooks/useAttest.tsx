import easAttest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address } from "viem";
import { useAccount, useWalletClient } from "wagmi";
import { http } from "viem";
import { baseSepolia } from "viem/chains";
import {
  createSmartAccountClient,
  ENTRYPOINT_ADDRESS_V06,
} from "permissionless";
import { createPimlicoPaymasterClient } from "permissionless/clients/pimlico";
import { CHAIN, RPC } from "@/lib/consts";

const useAttest = () => {
  const walletClient = useWalletClient();
  const account = useAccount();

  const attest = async (title: string, metadata: string) => {
    const cloudPaymaster = createPimlicoPaymasterClient({
      chain: CHAIN,
      transport: http(RPC),
      entryPoint: ENTRYPOINT_ADDRESS_V06,
    });
    console.log("SWEETS cloudPaymaster", cloudPaymaster);

    const smartAccountClient = createSmartAccountClient({
      account: account as any,
      chain: CHAIN,
      bundlerTransport: http(RPC),
      // IMPORTANT: Set up Cloud Paymaster to sponsor your transaction
      middleware: {
        sponsorUserOperation: cloudPaymaster.sponsorUserOperation,
      },
    });
    console.log("SWEETS smartAccountClient", smartAccountClient);

    const encodedAttestation = getEncodedAttestationData(
      title,
      metadata,
      [],
      [account.address as Address],
      []
    );
    const args = getAttestArgs(encodedAttestation);

    return await easAttest(smartAccountClient, args);
  };

  return { attest };
};

export default useAttest;
