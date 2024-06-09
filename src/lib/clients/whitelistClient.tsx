import { Address, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { CHAIN } from "../consts";

export const whitelistAccount = privateKeyToAccount(
  process.env.PRIVATE_KEY as Address
);

export const whitelistClient = createWalletClient({
  account: whitelistAccount,
  chain: CHAIN,
  transport: http(),
});
