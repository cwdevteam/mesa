"use client";
import React, { useState } from "react";
import ContractDetailsPage from "@/components/ProjectContract/ContractDetailsPage";

import MockData from "./project.json";
import ProjectTabs from "@/components/ProjectTabs";
import { ProjectPageProps, ProjectTab } from "@/types/const";
import ProjectDistribution from "@/components/Project/ProjectDistribution";
import ProjectDetailsComponent from "@/components/ProjectMetaDataTable/ProjectDetailsComponent";
import ProjectProvider from "@/context/ProjectProvider";

export default function Project({}: ProjectPageProps) {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab);
  };

  return (
    <ProjectProvider>
      <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
        <div className="mb-10 h-5">
          <ProjectTabs tabContent={tabContent} onTabChange={onTabChange} />
        </div>
        {tabContent === "project" && MockData && (
          <ProjectDetailsComponent project={MockData} />
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
    </ProjectProvider>
  );
}
