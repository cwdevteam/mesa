import ContractTypeSelect from './ContractTypeSelect'
import UserRoleSelect from './UserRoleSelect'
import SplitsInput from './SplitsInput'
import CloseButton from './CloseButton'

const ProjectMetadataForm = ({
  request,
  creditIndex,
}: {
  request: string
  creditIndex: number
}) => (
  <div className="grid gap-6">
    <ContractTypeSelect creditIndex={creditIndex} />
    <UserRoleSelect creditIndex={creditIndex} />
    <SplitsInput creditIndex={creditIndex} />
    <CloseButton request={request} />
  </div>
)

export default ProjectMetadataForm
