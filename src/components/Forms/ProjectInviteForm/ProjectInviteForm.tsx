"use client";

import { toast } from "@/components/ui/use-toast";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import InviteProjectButton from "./InviteProjectButton";

export default function ProjectInviteForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    user_email: "",
    description: "",
    name: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);
      toast({
        title: "Success",
        description: `Successfully email sent to INSERT_EMAIL`,
        variant: "default",
      });
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Failed",
        description: "Something went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <Label className="sr-only" htmlFor="name">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Team member"
          type="text"
          autoCapitalize="none"
          autoCorrect="off"
          disabled={loading}
          onChange={(e) =>
            setState({
              ...state,
              name: e.target.value,
            })
          }
          required
        />

        <Label className="sr-only" htmlFor="email">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          placeholder="Email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={loading}
          required
          onChange={(e) =>
            setState({
              ...state,
              user_email: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-col gap-4">
        <p>
          Send a message to your collaborators with relevant information about
          the project status.
        </p>
        <Textarea
          id="description"
          name="description"
          placeholder=""
          autoCapitalize="none"
          autoCorrect="off"
          disabled={loading}
          onChange={(e) =>
            setState({
              ...state,
              description: e.target.value,
            })
          }
        />
        <p>
          They will be invited to the project with the default permission set
          for attorney. You can update permissions anytime.
        </p>
        <div className="flex gap-3 justify-end">
          <DialogClose>
            <Button variant="outline" color="gray">
              Close
            </Button>
          </DialogClose>
          {loading ? (
            <Button className="inline-flex gap-2">
              <ReloadIcon
                color="currentColor"
                className="h-4 w-4 animate-spin"
              />
              Inviting...
            </Button>
          ) : (
            <InviteProjectButton handleSubmit={handleSubmit} />
          )}
        </div>
      </div>
    </div>
  );
}
