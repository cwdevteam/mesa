import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProjectMetaDataDialogProps } from "../ProjectCollaborators/types";

const ProjectMetaDataDialog = ({
  project,
  selectedUser,
  open,
  request = "create",
  setOpen,
  roleId,
  className,
  ...props
}: ProjectMetaDataDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className={cn("grid gap-8 max-w-sm px-8 py-16", className)}
        {...props}
      >
        <DialogHeader>
          <DialogTitle>
            {request === "create" ? "Create" : "Update"} Project Meta Data
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProjectMetaDataDialog;
