import { useAccount } from "wagmi";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";

const LoginButton = () => {
  const { address } = useAccount();

  return <div>{address ? <DisconnectButton /> : <ConnectButton />}</div>;
};

export default LoginButton;
