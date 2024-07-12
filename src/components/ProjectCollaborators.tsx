import React from "react";
import UserMatrixCard from "./ProjectMetaDataTable/UserMatrixCard";
import { Button } from "./ui/button";
import { ProjectCollaboratorsProps, User, UserData } from "@/types/const";
import PopUp from "@/components/Project/PopUp";
import ProjectInviteDialog from "@/components/Project/ProjectInviteDialog";

export function ProjectCollaborators({
  project,
  user,
  contractId,
  setContractId,
  setContractTime,
  onMakeContract: handleMakeContract,
}: {
  project?: ProjectCollaboratorsProps;
  user: User;
  contractId?: string;
  setContractId: (contractId?: string) => void;
  setContractTime: (contractTime: Date) => void;
  onMakeContract: () => void;
}) {
  const currentCollaborators = project?.collaborators as UserData[];

  return (
    <section className="w-full grid mt-4 max-w-auto">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold tracking-tight">Collaborators</h3>
        <div className="flex items-center gap-2">
          {!contractId ? (
            <PopUp
              project={project}
              setContractId={setContractId}
              setContractTime={setContractTime}
              onMakeContract={handleMakeContract}
            >
              <Button
                className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2"
                variant="outline"
              >
                {/*<Icons.contract*/}
                {/*  className="text-black dark:text-white"*/}
                {/*  style={{*/}
                {/*    width: "20px",*/}
                {/*    marginLeft: 5,*/}
                {/*  }}*/}
                {/*/>{" "}*/}
                <span className="hidden sm:block ml-1">Make Contract</span>
              </Button>
            </PopUp>
          ) : null}
          <ProjectInviteDialog user={user} project={project}>
            <Button
              variant="outline"
              className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2"
            >
              +<span className="hidden sm:block">&nbsp;Add Collaborator</span>
            </Button>
          </ProjectInviteDialog>
        </div>
      </div>

      {/*<div className="flex items-center gap-2 justify-end mb-2">*/}
      {/*  <Button*/}
      {/*    variant="outline"*/}
      {/*    className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2"*/}
      {/*  >*/}
      {/*    +<span className="hidden sm:block">&nbsp;Add Collaborator</span>*/}
      {/*  </Button>*/}
      {/*</div>*/}
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        <div className="w-full grid grid-cols-1 gap-4">
          {currentCollaborators.map((collaborator, index) => (
            <UserMatrixCard key={index} data={collaborator} />
          ))}
        </div>
      </div>
    </section>
  );
}
