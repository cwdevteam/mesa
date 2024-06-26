import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "../Project/types";
import { ProjectType } from "./types";

type CreateProjectDialogProps = React.HTMLAttributes<HTMLDivElement> & {
  user: User;
  project?: ProjectType;
};

const ProjectInviteDialog = ({
  user,
  children,
  className,
  project,
  ...props
}: CreateProjectDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
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
      </DialogContent>
    </Dialog>
  );
};

export default ProjectInviteDialog;
