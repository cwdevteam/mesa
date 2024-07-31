"use client";

import { useState } from "react";
import ProjectTabs from "../ProjectTabs";
import { ProjectTab } from "@/types/const";
import ProjectDetailsComponent from "../ProjectMetaDataTable/ProjectDetailsComponent";
import ContractDetailsPage from "../ProjectContract/ContractDetailsPage";
import ProjectDistribution from "./ProjectDistribution";
import MockData from "./project.json";
import DistributionOnchain from "../DistributionOnchain";

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab);
  };

  return (
    <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
      <div className="mb-10 h-5">
        <ProjectTabs tabContent={tabContent} onTabChange={onTabChange} />
      </div>
      {tabContent === "project" && <ProjectDetailsComponent />}
      {tabContent === "contract" && (
        <ContractDetailsPage
          project={MockData}
          contractTime={null}
          contractId="contractTestId"
          contractHistories={MockData.contractHistories}
        />
      )}
      {tabContent === "setting" && <ProjectDistribution />}
      {tabContent === "Zora" && <DistributionOnchain protocol="Zora" />}
      {tabContent === "Sound" && <DistributionOnchain protocol="Sound" />}
    </main>
  );
};

export default ProjectPage;
