'use client';
import React, { useState } from 'react';

import { Locale } from '@/../i18n.config';
import ContractDetailsPage from '@/components/ProjectContract/ContractDetailsPage';
import ProjectDetailsComponent from '@/components/ProjectMetaDataTable/ProjectDetailsComponent';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

import MockData from './project.json';

export type ProjectPageProps = {
  params: {
    lang: Locale;
    id: string;
  };
};

export type ProjectTab = 'project' | 'contract' | 'setting';

const ProjectTabs = ({
  tabContent,
  onTabChange,
}: {
  tabContent: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}) => (
  <Tabs defaultValue="project" value={tabContent}>
    <TabsList>
      <TabsTrigger value="project" onClick={() => onTabChange('project')}>
        Project
      </TabsTrigger>
      <TabsTrigger value="contract" onClick={() => onTabChange('contract')}>
        Contract
      </TabsTrigger>
      <TabsTrigger value="setting" onClick={() => onTabChange('setting')}>
        Setting
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export default function Project({}: ProjectPageProps) {
  const [tabContent, setTabContent] = useState<ProjectTab>('project');

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab);
  };

  // TODO resolve any type of attestation data
  // const currentProject = projects.find(
  //   project => project.find((data: any) => data?.name === 'rawData')?.value?.value[0] === id,
  // );

  // TODO integrate with api
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
