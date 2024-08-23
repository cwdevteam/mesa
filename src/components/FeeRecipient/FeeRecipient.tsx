import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProjectProvider } from '@/context/ProjectProvider'

const FeeRecipient = () => {
  const { feeRecipient, setFeeRecipient } = useProjectProvider()

  return (
    <div className="flex">
      <div className="grid w-full items-center gap-2">
        <Label htmlFor="feeRecipient">Fee Recipient:</Label>
        <Input
          type="text"
          name="feeRecipient"
          id="feeRecipient"
          required
          value={feeRecipient}
          onChange={(e) => setFeeRecipient(e.target.value)}
        />
      </div>
    </div>
  )
}

export default FeeRecipient
