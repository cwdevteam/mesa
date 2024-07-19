import ProjectMetaDataSubmitButton from "@/components/ProjectMetaDataSubmitButton";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import usePaymasterAttest from "@/hooks/usePaymasterAttest";
import { useState } from "react";

const CloseButton = ({ request }: any) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const { attest } = usePaymasterAttest();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await attest();
      console.log("Attest finished, reloading...");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Someting went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex gap-3 justify-end">
      <DialogClose>
        <Button variant="outline" color="gray">
          Close
        </Button>
      </DialogClose>
      <ProjectMetaDataSubmitButton
        handleSubmit={handleSubmit}
        loading={loading}
        request={request}
      />
    </div>
  );
};

export default CloseButton;
