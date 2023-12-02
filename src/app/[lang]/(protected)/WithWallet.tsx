'use client'

import { useEffect } from 'react';
import { createHash } from 'crypto';
import {
  useSetConnectionStatus,
  useSetConnectedWallet,
  useCreateWalletInstance,
} from '@thirdweb-dev/react';

import { ClientToken } from '@/lib/ClientToken';
import { mesaWallet } from '@/lib/wallet/react/mesaWallet';
import { fetchWalletId, fetchWalletToken } from '@/lib/wallet/server/actions';

export const WithWallet = ({ children }: { children: React.ReactNode }) => {
  const createWalletInstance = useCreateWalletInstance();
  const setConnectionStatus = useSetConnectionStatus();
  const setConnectedWallet = useSetConnectedWallet();

  useEffect(() => {
    // TODO support rotation of client token
    // See https://github.com/cwdevteam/mesa/issues/31
    const clientToken = new ClientToken()
    const connectWallet = async () => {
      // Create wallet instance scoped to the current user
      const walletId = await fetchWalletId()
      const wallet = createWalletInstance(mesaWallet({walletId}));
      
      // Get saved wallet address or generate a new wallet and get the address.
      const savedAddress = (await wallet.getSavedData())?.address
      const address = savedAddress || (await wallet.generate())
      // Generate deterministic wallet password.
      const token = clientToken.getToken(walletId)
      const walletToken = await fetchWalletToken(address);
      const walletPassword = createHash('sha256')
        .update(token + walletToken)
        .digest('base64')
      
      // Options used to load or save encrypted wallet.
      const options = {
        strategy: 'encryptedJson' as 'encryptedJson',
        password: walletPassword
      }

      // Load or save wallet
      // TODO support rotation of walletToken
      // See https://github.com/cwdevteam/mesa/issues/31
      if (savedAddress) {
        await wallet.load(options)
      } else {
        await wallet.save(options)
      }

      // TODO register wallet
      // See https://github.com/cwdevteam/mesa/issues/31

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