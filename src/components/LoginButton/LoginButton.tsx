"use client";
import { useAccount } from "wagmi";
import DisconnectButton from "./DisconnectButton";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
const LoginButton = () => {
  const { status } = useAccount();

  return (
    <div>
      {status === "disconnected" ? <ConnectAccount /> : <DisconnectButton />}
    </div>
  );
};

export default LoginButton;
