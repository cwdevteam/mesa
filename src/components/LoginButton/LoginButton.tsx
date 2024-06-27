import React from "react";
import DisconnectButton from "./DisconnectButton";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { useAccount } from "wagmi";

const LoginButton = () => {
  const { status } = useAccount();

  return (
    <div>
      {status === "disconnected" ? <ConnectAccount /> : <DisconnectButton />}
    </div>
  );
};

export default LoginButton;
