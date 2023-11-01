'use client'

import { useConnectionStatus, useAddress } from "@thirdweb-dev/react";

export function ConnectionStatus() {
  const connectionStatus = useConnectionStatus();
  const address = useAddress()

  if (connectionStatus === "unknown") return <p> Loading... </p>;
  if (connectionStatus === "connecting") return <p> Connecting... </p>;
  if (connectionStatus === "connected") return <p> You are connected: {address} </p>;
  if (connectionStatus === "disconnected")
    return <p> You are not connected to a wallet </p>;
}