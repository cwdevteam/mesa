import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import NewProjectButton from "../NewProjectButton";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";
import attest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { zeroAddress } from "viem";
import CreateButton from "./CreateButton";
import { ZERO_BYTES32 } from "@ethereum-attestation-service/eas-sdk";

export default function ProjectDetailsForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<Partial<any>>({
    title: "",
    description: "",
  });

  const handleClick = async () => {
    console.log("clicked");
    setLoading(true);
    console.log("clicked NEW");

    const encodedAttestation = getEncodedAttestationData(
      "title",
      "desc",
      ["author"],
      [zeroAddress],
      [ZERO_BYTES32]
    );
    console.log("encodedAttestation", encodedAttestation);

    const args = getAttestArgs(encodedAttestation);
    console.log("args", args);

    await attest(args);
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
          onBlur={(e) => {
            setState({
              ...state,
              title: e.target.value,
            });
          }}
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
          onBlur={(e) => {
            setState({
              ...state,
              description: e.target.value,
            });
          }}
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
