'use client'

import { useEffect } from 'react';
import { ClientToken } from '@/lib/ClientToken';
import {
  useSetConnectionStatus,
  useSetConnectedWallet,
  localWallet,
  useCreateWalletInstance,
} from "@thirdweb-dev/react";

export async function exchangeToken(token: string) {
  const response = await fetch('/api/exchangeToken', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token })
  });

  const { password } = await response.json();
  if (!password) {
    console.error('Failed to exchange token: missing password');
    return null;
  }

  return password;
}

const walletConfig = localWallet();

export const WithWallet = ({ children }: { children: React.ReactNode }) => {
  const createWalletInstance = useCreateWalletInstance();
  const setConnectionStatus = useSetConnectionStatus();
  const setConnectedWallet = useSetConnectedWallet();

  useEffect(() => {
    const clientToken = new ClientToken('__clientToken__')
    const connectWallet = async () => {
      const wallet = createWalletInstance(walletConfig);
      const token = clientToken.getToken()
      const password = await exchangeToken(token);
      await wallet.loadOrCreate({
        strategy: 'encryptedJson' as 'encryptedJson',
        password
      });

      try {
        setConnectionStatus("connecting");
        await wallet.connect()
        setConnectedWallet(wallet);
        setConnectionStatus("connected");
      } catch (e) {
        setConnectionStatus("disconnected");
        console.error("failed to connect", e);
      }
    };
    connectWallet();
  }, [createWalletInstance, setConnectedWallet, setConnectionStatus]);


  return <>{children}</>
};

export default WithWallet;