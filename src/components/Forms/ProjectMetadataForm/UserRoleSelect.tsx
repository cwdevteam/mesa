import { Label } from '@/components/ui/label'
import { userRoleOptions } from '@/types/projectMetadataForm'
import ProjectmetadataSelect from './ProjectMetadataSelect'
import { useProjectProvider } from '@/context/ProjectProvider'

const UserRoleSelect = ({ creditIndex }: { creditIndex: number }) => {
  const { credits, setCredits } = useProjectProvider()
  const userRole = credits[creditIndex].collaboratorType
  const label = userRoleOptions.find((v) => v.value === userRole)?.label

  const handleChange = (e: any) => {
    let newCredits = credits
    newCredits[creditIndex].collaboratorType = e
    setCredits([...newCredits])
  }

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">User Role</Label>
      <ProjectmetadataSelect
        handleChange={handleChange}
        value={userRole}
        label={label}
        options={userRoleOptions}
      />
    </div>
  )
}

export default UserRoleSelect
