"use client";
import React, { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";

import DisconnectButton from "./DisconnectButton";

const LoginButton = () => {
  const { address } = useAccount();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div>{address ? <DisconnectButton /> : <ConnectAccount />}</div>;
};

export default LoginButton;
