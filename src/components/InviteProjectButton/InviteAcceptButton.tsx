import { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

export default function InviteAcceptButton({ inviteId }: { inviteId: string }) {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (state: string) => {
    try {
      setLoading(true);
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        className="bg-blue-600 hover:bg-blue-800"
        onClick={() => handleSubmit("accept")}
        disabled={loading}
      >
        Accept
      </Button>
      <Button
        className="bg-red-600 hover:bg-red-800"
        onClick={() => handleSubmit("reject")}
        disabled={loading}
      >
        Reject
      </Button>
    </div>
  );
}
