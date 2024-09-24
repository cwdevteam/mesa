'use client'

import { ProjectDataTable } from '@/components/ProjectDataTable'
import NewProjectButton from '../NewProjectButton'
import useProjects from '@/hooks/project/useProjects'
import { useAccount } from 'wagmi'
import Home from './Home'

const DashboardPage = () => {
  const { projects } = useProjects()
  const { address } = useAccount()

  return (
    <>
      {address ? (
        <main className="grid gap-10 container mx-auto py-10 content-start">
          <div className="flex justify-between gap-4 -mt-2">
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Your Projects
            </h2>
            <NewProjectButton />
          </div>
          <ProjectDataTable data={projects} />
        </main>
      ) : (
        <Home />
      )}
    </>
  )
}

export default DashboardPage
