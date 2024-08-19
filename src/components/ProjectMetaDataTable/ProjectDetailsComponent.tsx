import ProjectCollaborators from '../ProjectCollaborators'
import ProjectDetailsCard from '../ProjectDetailsCard'
import UploadButton from '../Project/UploadButton'
import ImageSelect from '../Project/ImageSelect'

const ProjectDetailsComponent = () => (
  <div className="flex flex-col items-center lg:items-start gap-2 w-full">
    <ProjectDetailsCard />
    <div className="w-full">
      <ProjectCollaborators />
      <UploadButton />
      <ImageSelect />
    </div>
  </div>
)

export default ProjectDetailsComponent
