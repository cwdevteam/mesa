'use client'

import { useState } from 'react'
import ProjectTabs from '../ProjectTabs'
import { ProjectTab } from '@/types/const'
import ProjectDetailsComponent from '../ProjectMetaDataTable/ProjectDetailsComponent'
import ContractDetailsPage from '../ProjectContract/ContractDetailsPage'
import ProjectDistribution from './ProjectDistribution'
import DistributionOnchain from '../DistributionOnchain'
import { useProjectProvider } from '@/context/ProjectProvider'
import Loading from 'react-loading'

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>('project')
  const { updating } = useProjectProvider()

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab)
  }

  return (
    <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
      {updating && (
        <div
          className="fixed z-[9999] left-0 top-0 w-screen h-screen backdrop-blur-[4px] 
      flex-col gap-2 flex justify-center items-center"
        >
          <Loading type="spin" color="#ffffff" height={40} width={40} />
          <p className="font-semibold">Updating...</p>
        </div>
      )}
      <div className="mb-10 h-5">
        <ProjectTabs tabContent={tabContent} onTabChange={onTabChange} />
      </div>
      {tabContent === 'project' && <ProjectDetailsComponent />}
      {tabContent === 'contract' && <ContractDetailsPage />}
      {tabContent === 'setting' && <ProjectDistribution />}
      {tabContent === 'Zora' && <DistributionOnchain protocol="Zora" />}
      {tabContent === 'Sound' && <DistributionOnchain protocol="Sound" />}
    </main>
  )
}

export default ProjectPage
