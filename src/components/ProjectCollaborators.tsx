import React from "react";
import UserMatrixCard from "./ProjectMetaDataTable/UserMatrixCard";
import { Button } from "./ui/button";
import { useProjectProvider } from "@/context/ProjectProvider";
import { Credit } from "@/types/projectMetadataForm";
import ProjectInviteDialog from "./ProjectInviteDialog";
import ProjectInviteProvider from "@/context/ProjectInviteProvider";

const ProjectCollaborators = () => {
  const { credits } = useProjectProvider();

  return (
    <section className="w-full grid mt-4 max-w-auto">
      <h3 className="text-lg font-bold tracking-tight">Collaborators</h3>
      <div className="flex items-center gap-2 justify-end mb-2">
        <ProjectInviteProvider>
          <ProjectInviteDialog>
            <Button
              variant="outline"
              className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2"
            >
              +<span className="hidden sm:block">&nbsp;Add Collaborator</span>
            </Button>
          </ProjectInviteDialog>
        </ProjectInviteProvider>
      </div>
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        <div className="w-full grid grid-cols-1 gap-4">
          {credits.map((collaborator: Credit, index: number) => (
            <UserMatrixCard key={index} data={collaborator} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectCollaborators;
