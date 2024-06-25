'use client';
import React, { useState } from 'react';
import ContractDetailsPage from '@/components/ProjectContract/ContractDetailsPage';
import ProjectDetailsComponent from '@/components/ProjectMetaDataTable/ProjectDetailsComponent';
import MockData from './project.json';
import ProjectTabs from '@/components/ProjectTabs';
import { ProjectPageProps, ProjectTab } from '@/types/const';

export default function Project({}: ProjectPageProps) {
  const [tabContent, setTabContent] = useState<ProjectTab>('project');

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab);
  };

  const currentProject = MockData;

  return (
    <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
      <div className="mb-10 h-5">
        <ProjectTabs tabContent={tabContent} onTabChange={onTabChange} />
      </div>
      {tabContent === 'project' && currentProject && (
        <ProjectDetailsComponent project={currentProject} />
      )}
      {tabContent === 'contract' && (
        <ContractDetailsPage project={currentProject} contractId={undefined} />
      )}
      {tabContent === 'setting' && <div>Settings Component Placeholder</div>}
    </main>
  );
}
