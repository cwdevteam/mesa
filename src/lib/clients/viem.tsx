import {
  Chain,
  PublicClient,
  createPublicClient,
  createWalletClient,
  http,
  custom,
  WalletClient,
} from "viem";
import getViemNetwork from "./getViemNetwork";

export const getPublicClient = (chainId: number) => {
  const chain = getViemNetwork(chainId);
  let publicClient = createPublicClient({
    chain: chain as Chain,
    transport: http(),
  });
  return publicClient as PublicClient;
};

export const getWalletClient = (chainId: number) => {
  if (typeof window === "undefined") return null;
  const chain = getViemNetwork(chainId);
  let walletClient = createWalletClient({
    chain: chain as Chain,
    transport: custom(window.ethereum!),
  });
  return walletClient as WalletClient;
};
