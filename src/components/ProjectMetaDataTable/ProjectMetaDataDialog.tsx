import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

type ProjectType = any;
type ProjectUserProps = any;

export interface ProjectMetaDataDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  project?: ProjectType;
  selectedUser?: ProjectUserProps;
  request?: string;
  roleId?: string;
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

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
