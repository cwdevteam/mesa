import { useAccount } from "wagmi";
import DisconnectButton from "./DisconnectButton";
import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import NoSSR from "../NoSSR";

const LoginButton = () => {
  const { address } = useAccount();

  return <div>
    <NoSSR>
      {address ? <DisconnectButton /> : <ConnectAccount />}
    </NoSSR>
    </div>;
};

export default LoginButton;
