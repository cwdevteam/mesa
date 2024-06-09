import CreateProjectDialog from "./CreateProjectDialog";
import CreateButton from "./CreateButton";

const NewProjectButton = ({ handleSubmit }: { handleSubmit: () => void }) => (
  <CreateProjectDialog>
    <CreateButton onClick={handleSubmit} />
  </CreateProjectDialog>
);

export default NewProjectButton;
