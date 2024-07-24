"use client";

import React from "react";
import { useAccount } from "wagmi";
import MediaController from "./MediaController";
import { usePathname } from "next/navigation";

export default function MediaPlayer() {
  const { isConnected } = useAccount();
  const pathname = usePathname();

  // No media player for standalone create page
  if (pathname.endsWith("/create")) return null;

  return <div>{isConnected && <MediaController />}</div>;
}
