import React from 'react';

import Chat from '@/components/ProjectChatBox/Chat';
import { ProjectCollaborators } from '../ProjectCollaborators';
import ProjectDetailsCard from '../ProjectDetailsCard';
import { ProjectDetailsComponentProps } from '@/types/const';

const ProjectDetailsComponent = ({ project }: ProjectDetailsComponentProps) => {
  if (!project) {
    return null;
  }
  return (
    <div className="flex flex-col items-center lg:items-start gap-2 w-full">
      <ProjectDetailsCard
        projectName={project?.name}
        projectDescription={project?.description}
      />
      <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
        <div className="flex w-full">
          <ProjectCollaborators project={project} />
        </div>
        <div className="w-full lg:max-w-[400px]">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsComponent;
