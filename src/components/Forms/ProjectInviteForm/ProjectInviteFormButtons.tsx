import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import InviteProjectButton from "./InviteProjectButton";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import sendInviteEmail from "@/lib/email/sendInviteEmail";
import { useProjectInviteProvider } from "@/context/ProjectInviteProvider";
import { useParams } from "next/navigation";
import { ProjectIDType } from "@/types/const";

const ProjectInviteFormButtons = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { name, email, message } = useProjectInviteProvider();
  const { id } = useParams<ProjectIDType>();

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await sendInviteEmail(email, name, message, id);
      toast({
        title: "Success",
        description: `Successfully email sent to ${email}`,
        variant: "default",
      });
      setLoading(false);
    } catch (err: any) {
      console.error(err);
      setLoading(false);
      toast({
        title: "Failed",
        description: "Something went wrong!",
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
      {loading ? (
        <Button className="inline-flex gap-2">
          <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
          Inviting...
        </Button>
      ) : (
        <InviteProjectButton onClick={handleSubmit} />
      )}
    </div>
  );
};

export default ProjectInviteFormButtons;
