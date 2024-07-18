import { SplitV1Client } from "@0xsplits/splits-sdk";
import { Chain, HttpTransport, PublicClient } from "viem";

const dummyApiKey = "123456"; // XXX TODO: Replace with actual API key

export const getSplitsClient = ({
  chainId,
  publicClient,
}: {
  chainId: number;
  publicClient: PublicClient<HttpTransport, Chain>;
}) => {
  return new SplitV1Client({
    chainId,
    publicClient,
    apiConfig: { apiKey: dummyApiKey },
  });
};
