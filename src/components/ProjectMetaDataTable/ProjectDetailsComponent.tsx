import ProjectCollaborators from '../ProjectCollaborators'
import ProjectDetailsCard from '../ProjectDetailsCard'
import UploadButton from '../Project/UploadButton'
import ImageSelect from '../Project/ImageSelect'
import { useProjectProvider } from '@/context/ProjectProvider'
import Loading from 'react-loading'

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
          <ProjectDetailsCard />
          <div className="w-full">
            <ProjectCollaborators />
            <UploadButton />
            <ImageSelect />
          </div>
        </>
      )}
    </div>
  )
}

export default ProjectDetailsComponent
