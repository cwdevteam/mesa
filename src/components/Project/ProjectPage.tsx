"use client";

import { useEffect, useState } from "react";
import ProjectTabs from "../ProjectTabs";
import { ProjectIDType, ProjectTab } from "@/types/const";
import ProjectDetailsComponent from "../ProjectMetaDataTable/ProjectDetailsComponent";
import ContractDetailsPage from "../ProjectContract/ContractDetailsPage";
import ProjectDistribution from "./ProjectDistribution";
import MockData from "./project.json";
import { useAccount } from "wagmi";
import { useProjectProvider } from "@/context/ProjectProvider";
import { useParams } from "next/navigation";
import { usePaymasterProvider } from "@/context/Paymasters";
import { fetchAttestation } from "@/lib/eas/fetchAttestation";

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");
  const [data, setData] = useState(null);
  const { address } = useAccount();
  const { setName, setDescription } = useProjectProvider();
  const { id } = useParams<ProjectIDType>();
  const { error }: any = usePaymasterProvider();

  const fetchData = async () => {
    let { dashboardData }: any = await fetchAttestation(address, id);
    setData(dashboardData);
    setName(dashboardData["name"]);
    setDescription(dashboardData["description"]);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

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
