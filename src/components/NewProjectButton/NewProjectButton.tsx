import CreateProjectDialog from "./CreateProjectDialog";
import CreateButton from "./CreateButton";
import { useProjectProvider } from "@/context/ProjectProvider";
import CreatingPage from "./CreatingPage";

const NewProjectButton = () => {
  const { creatingStatus } = useProjectProvider()
  return (
    <CreateProjectDialog>
      {creatingStatus && <CreatingPage />}
      <CreateButton />
    </CreateProjectDialog>
  )
};

export default NewProjectButton;
