import CreateProjectDialog from "./CreateProjectDialog";
import CreateButton from "./CreateButton";
import ProjectProvider, { useProjectProvider } from "@/context/ProjectProvider";
import CreatingPage from "./CreatingPage";

const NewProjectButton = () => {
  const { creatingStatus } = useProjectProvider()
  return (
    <ProjectProvider>
      <CreateProjectDialog>
        {creatingStatus === "PENDING" && <CreatingPage />}
        <CreateButton />
      </CreateProjectDialog>
    </ProjectProvider>
  )
};

export default NewProjectButton;
