import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import NewProjectButton from "../NewProjectButton";
import { useState } from "react";
import { ReloadIcon } from "@radix-ui/react-icons";

export default function ProjectDetailsForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<Partial<any>>({
    title: "",
    description: "",
  });

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
          <NewProjectButton handleSubmit={() => setLoading(true)} />
        )}
      </div>
    </div>
  );
}
