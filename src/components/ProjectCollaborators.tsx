import React, { useState } from "react";
import UserMatrixCard from "./ProjectMetaDataTable/UserMatrixCard";
import { Button } from "./ui/button";
import { ProjectCollaboratorsProps, UserData } from "@/types/const";
import ProjectInviteDialog from "@/components/Project/ProjectInviteDialog";
import { useUserProvider } from "@/context/UserProvider";
import { ProjectMetaDataTable } from "@/components/ProjectMetaDataTable";
import { ProjectUserProps } from "@/components/ProjectCollaborators/types";

export function ProjectCollaborators({ project }: ProjectCollaboratorsProps) {
  const currentCollaborators = project?.collaborators as UserData[];
  const { user } = useUserProvider();

  return (
    <section className="w-full grid mt-4 max-w-auto">
      <h3 className="text-lg font-bold tracking-tight">Collaborators</h3>
      <div className="flex items-center gap-2 justify-end mb-2">
        <ProjectInviteDialog user={user} project={project}>
          <Button
            variant="outline"
            className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2"
          >
            +<span className="hidden sm:block">&nbsp;Add Collaborator</span>
          </Button>
        </ProjectInviteDialog>
      </div>
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        {/*<div className="w-full grid grid-cols-1 gap-4">*/}
        {/*  {currentCollaborators.map((collaborator, index) => (*/}
        {/*    <UserMatrixCard key={index} data={collaborator} />*/}
        {/*  ))}*/}
        {/*</div>*/}

        <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
          <ProjectMetaDataTable
            project={project}
            user={user}
            data={project.collaborators}
            invitations={project?.projectInvitations || []}
          />
        </div>
      </div>
    </section>
  );
}
