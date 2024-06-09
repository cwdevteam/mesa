import { encodeFunctionData } from "viem";
import { easAbi } from "../abi/eas";
import { CHAIN, EAS } from "../consts";

const attest = async (client: any, args: any[]) => {
  console.log("SWEETS args", args);
  try {
    const callData = encodeFunctionData({
      abi: easAbi,
      functionName: "attest",
      args,
    });
    // await client.switchChain(CHAIN);
    const tx = await client.sendTransaction({
      account: client.account,
      to: EAS,
      data: callData,
      value: 0,
    });
    return tx;
  } catch (err) {
    console.error("Error during attestation:", err);
    return false;
  }
};

export default attest;
