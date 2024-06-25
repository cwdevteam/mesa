import React, { useEffect, useRef } from "react";
import { useAccount, useConnect } from "wagmi";
import DisconnectButton from "./DisconnectButton";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { connect } from "http2";
import { toast, useToast } from "../ui/use-toast";

const LoginButton = () => {
  const { address, status } = useAccount();
  const { connect, connectors } = useConnect();
  const connector = connectors[0];

  // useEffect(() => {
  //   const savedAddress = localStorage.getItem("walletAddress");
  //   if (savedAddress && !address && status !== "connecting") {
  //     // Programmatically trigger the connect process if needed
  //     connect({ connector });
  //   }
  // }, [address, status]);

  // useEffect(() => {
  //   if (address) {
  //     localStorage.setItem("walletAddress", address);
  //   } else {
  //     localStorage.removeItem("walletAddress");
  //   }
  // }, [address]);

  const headerRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    // if (headerRef.current) {
    //   headerRef.current?.click();

    //   toast({
    //     description: `He eoivw np fq-pnn[ns]`,
    //     variant: "default",
    //   });
    //   console.log("clicked", "statusstatus123");
    // }

    const connectBtn = document.querySelector(".ock-connectaccount-button");
    if (connectBtn) {
      connectBtn.click();
      console.log("statusstatus12333");
    }
  }, []);

  console.log(status, "statusstatus");
  return (
    <div ref={headerRef}>
      {status === "disconnected" ? <ConnectAccount /> : <DisconnectButton />}
    </div>
  );
};

export default LoginButton;
