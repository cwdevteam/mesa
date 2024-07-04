import CreateProjectDialog from "./CreateProjectDialog";
import CreateButton from "./CreateButton";
import ProjectProvider from "@/context/ProjectProvider";

const NewProjectButton = () => (
  <ProjectProvider>
    <CreateProjectDialog>
      <CreateButton />
    </CreateProjectDialog>
  </ProjectProvider>
);

export default NewProjectButton;
