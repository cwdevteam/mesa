"use client";

import { Button } from "../ui/button";
import { useDisconnect } from "wagmi";

const DisconnectButton = () => {
  const { disconnect } = useDisconnect();

  return <Button onClick={() => disconnect()}>Disconnect from Mesa</Button>;
};

export default DisconnectButton;
