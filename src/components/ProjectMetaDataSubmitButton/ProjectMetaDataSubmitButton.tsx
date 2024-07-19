import { Pencil1Icon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const ProjectMetaDataSubmitButton = ({
  handleSubmit,
  loading,
  request,
}: {
  handleSubmit: () => void;
  loading: boolean;
  request: string;
}) => (
  <Button className="inline-flex gap-2" onClick={handleSubmit}>
    {loading ? (
      <Pencil1Icon color="currentColor" className="h-4 w-4" />
    ) : (
      <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
    )}
    {request === "edit" ? "Update" : "Create"}
  </Button>
);

export default ProjectMetaDataSubmitButton;
