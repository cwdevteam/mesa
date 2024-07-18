"use client";

import { useEffect, useState } from "react";
import ProjectTabs from "../ProjectTabs";
import { ProjectIDType, ProjectTab } from "@/types/const";
import ProjectDetailsComponent from "../ProjectMetaDataTable/ProjectDetailsComponent";
import ContractDetailsPage from "../ProjectContract/ContractDetailsPage";
import ProjectDistribution from "./ProjectDistribution";
import MockData from "./project.json";
import { useProjectProvider } from "@/context/ProjectProvider";
import useAttestation from "@/hooks/useAttestation";
import axios from "axios";
import { useUserProvider } from "@/context/UserProvider";
import { useParams } from "next/navigation";
import { addProjectHandler } from "@/lib/projects/addProjectHandler";
import { addRoleHandler } from "@/lib/projects/addRoleHandler";
import { invitationHandler } from "@/lib/projects/invitationHandler";

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");
  const [data, setData] = useState(null);
  const { setName, setDescription } = useProjectProvider();
  const { dashboardData }: any = useAttestation();
  const { user } = useUserProvider();
  const { id } = useParams<ProjectIDType>();

  const fetchProjectByID = async () => {
    const { data } = await axios.get(`/api/userProjects?id=${id}&action=byId`);
    const { data: allInvitations } = await axios.get(
      `/api/userProjects?id=${user.id}&projectId=${id}`
    );
    return { data, allInvitations };
  };

  const addCollaborator = async (name: string, description: string) => {
    let collaborators: any = await invitationHandler(
      description,
      name,
      user,
      id,
      "Accepted",
      user.username,
      user.email,
      "Owner"
    );

    let roleData = await addRoleHandler(
      id,
      "Master",
      "Owner",
      collaborators.data.id
    );
    let collabData = collaborators.data;
    collaborators.data["roles"] = [roleData];
    return [collabData];
  };

  const fetchData = async () => {
    if (dashboardData) {
      setName(dashboardData["name"]);
      setDescription(dashboardData["description"]);
      let { data, allInvitations } = await fetchProjectByID();
      let collaborators = data;
      if (collaborators.length === 0) {
        collaborators = await addCollaborator(
          dashboardData["name"],
          dashboardData["description"]
        );
      }
      dashboardData["collaborators"] = collaborators;
      dashboardData["projectInvitations"] = allInvitations;
      setData(dashboardData);
    }
  };

  useEffect(() => {
    dashboardData && user && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData, user]);

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab);
  };

  return (
    <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
      <div className="mb-10 h-5">
        <ProjectTabs tabContent={tabContent} onTabChange={onTabChange} />
      </div>
      {tabContent === "project" && data && (
        <ProjectDetailsComponent project={data} />
      )}
      {tabContent === "contract" && (
        <ContractDetailsPage
          project={MockData}
          contractTime={null}
          contractId="contractTestId"
          contractHistories={MockData.contractHistories}
        />
      )}
      {tabContent === "setting" && <ProjectDistribution />}
    </main>
  );
};

export default ProjectPage;
