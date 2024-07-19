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
    return tx;
  } catch (err) {
    console.error("Error during attestation:", err);
    return false;
  }
};

export default attest;
