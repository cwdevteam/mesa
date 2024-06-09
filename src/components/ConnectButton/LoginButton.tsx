import { useAccount } from "wagmi";
import DisconnectButton from "./DisconnectButton";
// import ConnectButton from "./ConnectButton";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";

const LoginButton = () => {
  const { address } = useAccount();

  return <div>{address ? <DisconnectButton /> : <ConnectAccount />}</div>;
};

export default LoginButton;
