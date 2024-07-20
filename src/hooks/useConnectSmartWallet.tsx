import { useConnect } from "wagmi";

const useConnectSmartWallet = () => {
  const { connect: wagmiConnect, connectors, data } = useConnect();

  const connect = () => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector && !data) {
      wagmiConnect({ connector: coinbaseWalletConnector });
    }
  };

  return { connect };
};

export default useConnectSmartWallet;
