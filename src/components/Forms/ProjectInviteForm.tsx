"use client";

import { useRouter } from "next/router";
import { toast } from "@/components/ui/use-toast";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { DialogClose } from "@radix-ui/react-dialog";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import InviteProjectButton from "../InviteProjectButton";
import { useState } from "react";
import axios from "axios";
import { ProjectType, User } from "@/types/const";

export default function ProjectInviteForm({
  user,
  project,
}: {
  user: User;
  project: ProjectType;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<any>({
    user_email: "",
    description: "",
    name: "",
  });

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        "/api/project_invitation/collaborator",
        {
          state: state,
          id: project.id,
          owner: user.id,
        }
      );

      if (data && data.to) {
        toast({
          title: "Success",
          description: `Successfully email sent to ${data.to}`,
          variant: "default",
        });
        router.reload();
      }
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data) {
        toast({
          title: "Failed",
          description: err.response.data,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Failed",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
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
