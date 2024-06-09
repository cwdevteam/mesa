import { baseSepolia } from "viem/chains";
import { getPublicClient } from "../clients";
import { easAbi } from "../abi/eas";
import { EAS } from "../consts";
import getDecodedAttestedLog from "./getDecodedAttestedLog";

const getAttestations = async (rawEvents: any[]) => {
  const publicClient = getPublicClient(baseSepolia.id);
  const wagmiContract = {
    address: EAS,
    abi: easAbi,
    functionName: "getAttestation",
  } as const;
  const contracts = rawEvents.map((event) => {
    const decoded = getDecodedAttestedLog(event) as any;
    const uid = decoded?.args?.uid;
    return {
      ...wagmiContract,
      args: [uid],
    };
  }) as any;
  const results = await publicClient.multicall({ contracts });
  return results;
};

export default getAttestations;
