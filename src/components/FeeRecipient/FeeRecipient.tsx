import { Input } from '@/components/ui/input'
import { useProjectProvider } from '@/context/ProjectProvider'

const FeeRecipient = () => {
  const { feeRecipient, setFeeRecipient } = useProjectProvider()

  return (
    <div className="grid w-full items-center gap-2">
      <Input
        type="text"
        name="feeRecipient"
        id="feeRecipient"
        required
        value={feeRecipient}
        onChange={(e) => setFeeRecipient(e.target.value)}
      />
    </div>
  )
}

export default FeeRecipient
