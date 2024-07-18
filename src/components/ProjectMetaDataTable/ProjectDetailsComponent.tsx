import React from "react";

import Chat from "@/components/ProjectChatBox/Chat";
import { ProjectCollaborators } from "../ProjectCollaborators";
import ProjectDetailsCard from "../ProjectDetailsCard";
import { ProjectDetailsComponentProps } from "@/types/const";
import UploadButton from "../Project/UploadButton";

const ProjectDetailsComponent = ({ project }: ProjectDetailsComponentProps) => {
  return (
    <div className="flex flex-col items-center lg:items-start gap-2 w-full">
      <ProjectDetailsCard />
      <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
        <div className="w-full">
          <ProjectCollaborators project={project} />
          <UploadButton />
        </div>
        <div className="w-full lg:max-w-[400px]">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsComponent;
