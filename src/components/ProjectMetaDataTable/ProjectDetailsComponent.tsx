import Contracts from './Contracts'
import { useProjectProvider } from '@/context/ProjectProvider'
import Loading from 'react-loading'
import Collaborators from './Collaborators'
import WorkRoom from './WorkRoom'
import Notes from './Notes'

const ProjectDetailsComponent = () => {
  const { loading } = useProjectProvider()

  return (
    <div className="flex flex-col items-center lg:items-start gap-2 w-full">
      {loading ? (
        <div className="col-span-2 w-full pl-10">
          <Loading type="spin" color="#ffffff" height={40} width={40} />
        </div>
      ) : (
        <>
          <div className="w-full grid grid-cols-10 gap-8">
            <Collaborators />
            <Contracts />
            <WorkRoom />
            <Notes />
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectDetailsComponent
