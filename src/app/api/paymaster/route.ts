import { CHAIN } from "@/lib/consts";
import { paymasterClient } from "../config";
import { willSponsor } from "../utils";
import { toFunctionSelector } from "viem";
import { easAbi } from "@/lib/abi/eas";

export async function POST(r: Request) {
  const req = await r.json();
  const method = req.method;
  const [userOp, entrypoint, chainId] = req.params;

  const selector_3 = toFunctionSelector({
    name: 'ownerOf',
    type: 'function',
    inputs: [{ name: 'bytes32', type: 'tuple' }],
    outputs: [],
    stateMutability: 'view',
  })
  console.log("SWEETS selector_3", selector_3)

  if (!willSponsor({ chainId: parseInt(chainId), entrypoint, userOp })) {
    return Response.json({ error: "Not a sponsorable operation" });
  }

  console.log("SWEETS METHOD", method)
  console.log("SWEETS userOp", userOp)
  if (method === "pm_getPaymasterStubData") {
    console.log("SWEETS CHAIN", CHAIN)
    console.log("SWEETS process.env.PAYMASTER_SERVICE_URL", process.env.PAYMASTER_SERVICE_URL)
    const result = await paymasterClient.getPaymasterStubData({
      userOperation: userOp,
    });
    console.log("SWEETS RESULT", result)
    return Response.json({ result });
  } else if (method === "pm_getPaymasterData") {
    const result = await paymasterClient.getPaymasterData({
      userOperation: userOp,
    });
    console.log("SWEETS RESULT", result)
    return Response.json({ result });
  }
  return Response.json({ error: "Method not found" });
}
