"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAccount, useDisconnect } from "wagmi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Icons } from "../Icons";
import NoSSR from "../NoSSR";
import { Button } from "@/components/ui/button";
import ConnectButton from "./ConnectButton";

export default function WalletDropdownButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { push } = useRouter();
  const [isCopied, setIsCopied] = useState(false);

  const onCopyAddress = () => {
    navigator.clipboard.writeText(address as string);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const abbrAddress: any = (addr: `string`) =>
    addr ? addr.slice(0, 5) + "..." + addr.slice(37, 42) : "";

  const redirectProfile = () => {
    push("/profile");
  };

  return (
    <NoSSR>
      {address ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              <Icons.Wallet />
              <div className="ml-3 hidden sm:block">{abbrAddress(address)}</div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onCopyAddress}>
              {!isCopied ? "Copy Address" : "Copied"}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={redirectProfile}>
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => disconnect()}>
              Disconnect Wallet
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <ConnectButton showTextInMobile />
      )}
    </NoSSR>
  );
}
