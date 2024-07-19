import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import ProjectInviteForm from "../Forms/ProjectInviteForm";
import { ProjectType } from "@/components/ProjectCollaborators/types";
import { User } from "@sentry/types";
import { useState } from "react";

type CreateProjectDialogProps = React.HTMLAttributes<HTMLDivElement> & {
  // TODO
  user: User;
  project?: ProjectType;
};

export default function ProjectInviteDialog({
  user,
  children,
  className,
  project,
  ...props
}: CreateProjectDialogProps) {
  const [open, setOpen] = useState(false);
  const openDialog = () => setOpen(true);
  const closeDialog = () => setOpen(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        onClick={() => {
          openDialog();
        }}
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent
        className={cn("grid gap-8 max-w-md px-8 py-16", className)}
        {...props}
      >
        <DialogHeader>
          <DialogTitle>Loop in the team</DialogTitle>
          <DialogDescription>
            Collaborators will be notified that you would like to be involved in
            this work in progress.
          </DialogDescription>
        </DialogHeader>
        <div className="max-w-full">
          {project ? (
            <ProjectInviteForm
              showInviteDialogueHandler={() => {
                closeDialog();
              }}
              user={user}
              project={project}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
