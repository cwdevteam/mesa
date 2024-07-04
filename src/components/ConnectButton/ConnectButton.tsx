import { ConnectAccount } from "@coinbase/onchainkit/wallet";
import { Icons } from "../Icons";
import "./style.css";
import { Button } from "../ui/button";
import { ConnectButtonProps } from "@/types/const";

const ConnectButton = ({ showTextInMobile }: ConnectButtonProps) => (
  <Button className="relative sm:w-auto" variant="ghost">
    <div className="flex gap-2 items-center">
      <Icons.Wallet />
      <span
        className={`${
          showTextInMobile
            ? 'hidden sm:block text-base sm:text-sm'
            : 'block text-base'
        } whitespace-nowrap`}
      >
        Connect Wallet
      </span>
    </div>
    <ConnectAccount />
  </Button>
)

export default ConnectButton;
