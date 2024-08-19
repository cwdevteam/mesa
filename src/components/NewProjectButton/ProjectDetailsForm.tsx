import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { ReloadIcon } from "@radix-ui/react-icons";
import CreateButton from "./CreateButton";
import { toast } from "../ui/use-toast";
import usePaymasterAttest from "@/hooks/project/usePaymasterAttest";
import { useProjectProvider } from "@/context/ProjectProvider";
import { useEffect, useState } from "react";

export default function ProjectDetailsForm() {
  const { attest, callsStatusId } = usePaymasterAttest();
  const { name, setName, setDescription, setCreatingStatus } = useProjectProvider();
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (!name) {
      toast({
        title: "Error",
        description: "Title and Description are required.",
        variant: "default",
      });
      return;
    }

    setLoading(true)
    try {
      await attest();
      setLoading(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create project.",
        variant: "default",
      });
      setLoading(false);
    }
  };

  useEffect(() => {
    setCreatingStatus(callsStatusId)
  }, [callsStatusId])

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          name="title"
          placeholder=""
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          required
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="title">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder=""
          autoCapitalize="none"
          autoCorrect="off"
          onBlur={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <DialogClose>
          <Button variant="outline" color="gray">
            Close
          </Button>
        </DialogClose>
        {loading ? (
          <Button className="inline-flex gap-2">
            <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
            Creating...
          </Button>
        ) : (
          <CreateButton onClick={handleClick} />
        )}
      </div>
    </div>
  );
}
