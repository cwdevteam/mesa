import { Label } from '@/components/ui/label'
import { contractTypeOptions, Credit } from '@/types/projectMetadataForm'
import ProjectmetadataSelect from './ProjectMetadataSelect'
import { useProjectProvider } from '@/context/ProjectProvider'

const ContractTypeSelect = ({ creditIndex }: { creditIndex: number }) => {
  const { credits, setCredits } = useProjectProvider()
  const contractType = credits[creditIndex].contractType
  const label = contractTypeOptions.find((v) => v.value === contractType)?.label

  const handleChange = (e: any) => {
    let newCredits = credits
    newCredits[creditIndex].contractType = e
    setCredits([...newCredits])
  }

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">Contract Type</Label>
      <ProjectmetadataSelect
        handleChange={handleChange}
        value={contractType}
        label={label}
        options={contractTypeOptions}
      />
    </div>
  )
}

export default ContractTypeSelect
