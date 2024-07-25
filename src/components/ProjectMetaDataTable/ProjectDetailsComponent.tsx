import Chat from "@/components/ProjectChatBox/Chat";
import ProjectCollaborators from "../ProjectCollaborators";
import ProjectDetailsCard from "../ProjectDetailsCard";
import UploadButton from "../Project/UploadButton";
import ImageSelect from "../Project/ImageSelect";

const ProjectDetailsComponent = () => (
  <div className="flex flex-col items-center lg:items-start gap-2 w-full">
    <ProjectDetailsCard />
    <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
      <div className="w-full">
        <ProjectCollaborators />
        <UploadButton />
        <ImageSelect />
      </div>
      <div className="w-full lg:max-w-[400px]">
        <Chat />
      </div>
    </div>
  </div>
);

export default ProjectDetailsComponent;
