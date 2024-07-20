import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import usePaymasterAttest from "@/hooks/usePaymasterAttest";
import { useRouter } from "next/navigation";
import { useConnect } from "wagmi";

const InvitePageButtons = () => {
  const { toast } = useToast();
  const { attest } = usePaymasterAttest();
  const { push } = useRouter();
  const { connect, connectors, data } = useConnect();

  const handleSubmit = async (accepted: boolean) => {
    const coinbaseWalletConnector = connectors.find(
      (connector) => connector.id === "coinbaseWalletSDK"
    );
    if (coinbaseWalletConnector && !data) {
      connect({ connector: coinbaseWalletConnector });
    }
    try {
      if (!accepted) {
        toast({
          title: "Declined",
          description: "Declined Invitation",
          variant: "default",
        });
        push("/");
        return;
      }
      await attest();
      toast({
        title: "Success",
        description: "Accepted Invitation",
        variant: "default",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center gap-4">
      <Button
        className="bg-green-600 px-4 py-3 hover:bg-green-700"
        onClick={() => handleSubmit(true)}
      >
        Accept invitation
      </Button>
      <Button
        className="bg-zinc-100 text-black border-2 border-zinc-200 hover:bg-zinc-200"
        onClick={() => handleSubmit(false)}
      >
        Decline
      </Button>
    </div>
  );
};

export default InvitePageButtons;
