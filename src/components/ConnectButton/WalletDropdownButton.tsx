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
import ConnectButton from ".";
import { truncateAddress } from "@/lib/utils";
import useClipboard from "@/hooks/useClipboard";

export default function WalletDropdownButton() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const { push } = useRouter();
  const { setClipboard } = useClipboard();
  const [isCopied, setIsCopied] = useState(false);

  const onCopyAddress = () => {
    if (!address) return;
    
    setClipboard(address);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

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
              <div className="ml-3 hidden sm:block">
                {truncateAddress(address)}
              </div>
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
