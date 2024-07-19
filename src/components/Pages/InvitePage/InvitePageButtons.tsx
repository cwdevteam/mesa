import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const InvitePageButtons = () => {
  const { toast } = useToast();

  const handleSubmit = async (accepted: boolean) => {
    try {
      toast({
        title: "Success",
        description: `${accepted ? "Accepted" : "Declined"} Invitation`,
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
