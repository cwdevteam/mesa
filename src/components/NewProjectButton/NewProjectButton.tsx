import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import CreateProjectDialog from "./CreateProjectDialog";

export default function NewProjectButton({
  handleSubmit,
}: {
  handleSubmit: () => void;
}) {
  return (
    <CreateProjectDialog>
      <Button className="inline-flex gap-2" onClick={handleSubmit}>
        <PlusCircledIcon color="currentColor" className="h-4 w-4" />
        Create
      </Button>
    </CreateProjectDialog>
  );
}
