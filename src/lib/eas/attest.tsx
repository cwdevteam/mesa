import { getWalletClient } from "@wagmi/core";
import wagmiConfig from "../wagmi/config";
import { easAbi } from "../abi/eas";
import { CHAIN, EAS } from "../consts";

const attest = async (args: any[]) => {
  const client = await getWalletClient(wagmiConfig);

  try {
    const tx = await client.writeContract({
      address: EAS,
      abi: easAbi,
      functionName: "attest",
      args,
    });
    return tx;
  } catch (err) {
    console.error("Error during attestation:", err);
    return false;
  }
};

export default attest;
