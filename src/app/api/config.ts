import { createClient, createPublicClient, http } from "viem";
import { ENTRYPOINT_ADDRESS_V06 } from "permissionless";
import { paymasterActionsEip7677 } from "permissionless/experimental";
import { CHAIN } from "@/lib/consts";

export const client = createPublicClient({
  chain: CHAIN,
  transport: http(),
});

const paymasterService = process.env.PAYMASTER_SERVICE_URL!;

export const paymasterClient = createClient({
  chain: CHAIN,
  transport: http(paymasterService),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 } as any));
