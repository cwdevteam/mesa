"use client";
import { useAccount } from "wagmi";
import DisconnectButton from "./DisconnectButton";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import NoSSR from "../NoSSR";
import { useState, useEffect } from "react";
import { signInWithWallet } from "@/utils";
import { useUser } from "@/context/UserProvider";

export type TUser = {
  userId?: string;
  username?: string | null;
  website?: string | null;
  avatar_url?: string | null;
  full_name?: string | null;
};

const LoginButton = () => {
  const { user } = useUser();
  const { address } = useAccount();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleLogin = async () => {
      if (!address) return;

      setLoading(true);
      setError(null);

      try {
        const signature = "simulated_signature";
        const user: TUser = await signInWithWallet(address, signature);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!user && address) {
      handleLogin();
    }
  }, [
    address,
    user?.avatar_url,
    user?.full_name,
    user?.username,
    user?.website,
  ]);

  return (
    <div className="flex gap-3 items-center">
      <NoSSR>
        {loading ? (
          <p>Loading...</p>
        ) : address ? (
          <>
            <DisconnectButton />
            <p>
              {user
                ? `Welcome, ${
                    user.username ||
                    `${user.userId?.substring(0, 5)}...${user.userId?.substring(
                      user.userId?.length - 4
                    )}`
                  }`
                : "Connected"}
            </p>
          </>
        ) : (
          <ConnectAccount />
        )}
        {error && <p className="text-red-500">{error}</p>}
      </NoSSR>
    </div>
  );
};

export default LoginButton;
