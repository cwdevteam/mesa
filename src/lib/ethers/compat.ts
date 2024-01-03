import {
  Wallet as WalletV6,
  Provider as ProviderV6,
  JsonRpcProvider as JsonRpcProviderV6,
  JsonRpcApiProvider as JsonRpcApiProvider,
  FetchRequest as FetchRequestV6
} from "ethers6";

import {
  Wallet as WalletV5
} from "ethers5";
import {
  Provider as ProviderV5,
  JsonRpcProvider as JsonRpcProviderV5,
  StaticJsonRpcProvider as StaticJsonRpcProviderV5,
} from "ethers5_providers";
import { 
  ConnectionInfo as ConnectionInfoV5
} from "ethers5_web";

import { StaticJsonRpcBatchProvider } from "@thirdweb-dev/sdk";

export type {
  Signer as SignerV6,
  Wallet as WalletV6,
  Provider as ProviderV6,
} from 'ethers6'

export type {
  Signer as SignerV5,
  Wallet as WalletV5,
} from 'ethers5'
export {
  Provider as ProviderV5,
} from "ethers5_providers"

function convertV5ConnectionInfoToV6FetchRequest(connectionV5: ConnectionInfoV5): FetchRequestV6 {
  const url = connectionV5.url;
  const headers = connectionV5.headers;
  const fetchRequestV6 = new FetchRequestV6(url);
  for (const key in headers) {
    fetchRequestV6.setHeader(key, headers[key]);
  }
  return fetchRequestV6;
}

function isConnectionInfoV5(obj: any): obj is ConnectionInfoV5 {
  return 'url' in obj && 'headers' in obj;
}

export function convertV5toV6Provider(providerV5: ProviderV5): ProviderV6 {
  if ('connection' in providerV5 && isConnectionInfoV5(providerV5.connection)) {
    const connectionInfo = providerV5.connection;
    const fetchRequest = convertV5ConnectionInfoToV6FetchRequest(connectionInfo);
    if (providerV5 instanceof StaticJsonRpcBatchProvider) {
      const options = {
        // @ts-ignore
        batchMaxCount: providerV5._sizeLimit,
        // @ts-ignore
        batchStallTime: providerV5._timeLimitMs,
        staticNetwork: true
      }
      return new JsonRpcProviderV6(fetchRequest, providerV5.network, options)
    } else if (providerV5 instanceof StaticJsonRpcProviderV5) {
      return new JsonRpcProviderV6(fetchRequest, providerV5.network, {staticNetwork: true});
    } else if (providerV5 instanceof JsonRpcProviderV5) {
      return new JsonRpcProviderV6(fetchRequest, providerV5.network)
    }
    return new JsonRpcProviderV6(fetchRequest)
  }

  throw new Error(`Unsupported provider: ${providerV5?.constructor.name}`);
}

export function convertV5toV6Wallet(walletV5: WalletV5): WalletV6 {
  const privateKey = walletV5.privateKey;
  const providerV5 = walletV5.provider; // May be null, despite type sig
  const providerV6 = convertV5toV6Provider(providerV5)
  return new WalletV6(privateKey, providerV6);
}