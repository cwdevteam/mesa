import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import attest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import CreateButton from "./CreateButton";
import { toast } from "../ui/use-toast";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { Address } from "viem";

export default function ProjectDetailsForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const { push } = useRouter();
  const { address } = useAccount();

  const handleClick = async () => {
    setLoading(true);
    const encodedAttestation = getEncodedAttestationData(
      title,
      description,
      [],
      [address as Address],
      []
    );
    const args = getAttestArgs(encodedAttestation);
    await attest(args);
    toast({
      title: "Success",
      description: "Project Created Successfully!",
      variant: "default",
    });
    await push(`/projects/refId`);
  };

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
          onBlur={(e) => setTitle(e.target.value)}
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
