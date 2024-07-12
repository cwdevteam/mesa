import React, { useEffect, useState } from "react";

import Chat from "@/components/ProjectChatBox/Chat";
import { ProjectCollaborators } from "../ProjectCollaborators";
import ProjectDetailsCard from "../ProjectDetailsCard";
import { ProjectDetailsComponentProps } from "@/types/const";
import UploadButton from "../Project/UploadButton";
import { useAccount } from "wagmi";
import useUser from "@/hooks/useUser";

const ProjectDetailsComponent = ({
  project,
  setTabContent,
}: ProjectDetailsComponentProps) => {
  const [contractId, setContractId] = useState<string | undefined>();
  const [contractTime, setContractTime] = useState<Date | undefined>();
  const { address } = useAccount();
  const { user } = useUser();

  useEffect(() => {
    if (address) {
      getProject();
    }
  }, [address]);

  const getProject = async () => {
    try {
      const { contracts } = project;
      if (!contracts || !contracts.length) {
        setContractId(undefined);
      } else {
        setContractId(contracts[0].id);
        setContractTime(contracts[0].created_at);
      }
    } catch (err) {}
  };

  return (
    <div className="flex flex-col items-center lg:items-start gap-2 w-full">
      <ProjectDetailsCard
        projectDescription={String(project?.description)}
        projectName={String(project?.name)}
      />
      <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
        <div className="w-full">
          <ProjectCollaborators
            user={user}
            project={project}
            contractId={contractId}
            setContractId={setContractId}
            setContractTime={setContractTime}
            onMakeContract={() => setTabContent("contract")}
          />
          <UploadButton projectId={String(project.id)} />
        </div>
        <div className="w-full lg:max-w-[400px]">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsComponent;
