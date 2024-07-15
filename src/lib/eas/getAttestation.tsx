import { ethGetLogs } from "@/lib/alchemy/eth_getLogs";
import { Address } from "viem";
import getAttestations from "@/lib/eas/getAttestations";

export const getAttestationData = async (address: string, uid: string) => {
  let logs = await ethGetLogs(address as Address);
  logs = logs.filter((log: any) => log.data === uid);
  const attestations = await getAttestations(logs);
  return attestations.map((attestation: any) => ({
    ...attestation,
    result: attestation.result.map((value: any) =>
      typeof value === "bigint" ? value.toString() : value
    ),
  }));
};
