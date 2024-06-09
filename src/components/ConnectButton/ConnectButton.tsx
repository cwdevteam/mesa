"use client";

import { Button } from "../ui/button";
import { useConnect } from "wagmi";
import { coinbaseWallet } from "wagmi/connectors";

const ConnectButton = () => {
  const { connect } = useConnect();

  return (
    <Button onClick={() => connect({ connector: coinbaseWallet() })}>
      Connect to Mesa
    </Button>
  );
};

export default ConnectButton;
