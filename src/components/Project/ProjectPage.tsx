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
import { getCollaboratorData } from "@/lib/collaborator/getCollaborator";
import { Address } from "viem";
import { useParams } from "next/navigation";

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");
  const [data, setData] = useState(null);
  const { setName, setDescription } = useProjectProvider();
  const { dashboardData }: any = useAttestation();
  const { user } = useUserProvider();
  const { id } = useParams<ProjectIDType>();

  const fetchProjectByID = async () => {
    const { data } = await axios.get(`/api/userProjects?id=${id}`);
    return data;
  };

  const addCollaborator = async (name: string, description: string) => {
    let apiData = {
      id: id,
      title: name,
      description,
      created_by: user.id,
    };
    let { data: project } = await axios.post("/api/projects/", apiData);
    let invitationData = {
      contract_type: "Master",
      created_by: user.id,
      description,
      title: name,
      status: "Accepted",
      user_bps: 1000,
      user_email: user.username,
      user_id: user.id,
      user_name: user.username,
      user_role: "Owner",
      project_id: project.id,
    };
    await axios.post("/api/invitations/", invitationData);
  };

  const fetchData = async () => {
    if (dashboardData) {
      setName(dashboardData["name"]);
      setDescription(dashboardData["description"]);
      let collaborators = await fetchProjectByID();
      if (collaborators.length === 0) {
        await addCollaborator(
          dashboardData["name"],
          dashboardData["description"]
        );
      }
      // debugger;
      // const { data } = await axios.get("/api/collaborators/");
      // let collaborators = getCollaboratorData(data, user);
      dashboardData["collaborators"] = collaborators;
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
