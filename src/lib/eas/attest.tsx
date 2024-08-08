import { easAbi } from "../abi/eas";
import { EAS } from "../consts";

const attest = async (writeContracts: any, capabilities: any, args: any[]) => {
  try {
    const tx = await writeContracts({
      contracts: [
        {
          address: EAS,
          abi: easAbi,
          functionName: "attest",
          args,
        },
      ],
      capabilities,
    });
    console.log("SWEETS TX", tx);
    return tx;
  } catch (err) {
    console.error("Error during attestation:", err);
    return false;
  }
};

export default attest;
