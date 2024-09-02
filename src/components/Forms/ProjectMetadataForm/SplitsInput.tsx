import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useProjectProvider } from '@/context/ProjectProvider'
import bpsToPercent from '@/lib/bpsToPercent'
import percentToBps from '@/lib/percentToBps'

const SplitsInput = ({ creditIndex }: { creditIndex: number }) => {
  const { credits, setCredits } = useProjectProvider()
  const splitBps = credits[creditIndex]?.splitBps || 100
  const [splitPercent, setSplitPercent] = useState(bpsToPercent(splitBps))

  useEffect(() => {
    setSplitPercent(bpsToPercent(splitBps))
  }, [splitBps])

  const handleChange = (e: any) => {
    const newPercent = e.target.value
    setSplitPercent(newPercent)
  }

  const handleBlur = () => {
    let newCredits = credits
    newCredits[creditIndex].splitBps = percentToBps(splitPercent)
    setCredits([...newCredits])
  }

  return (
    <div className="grid gap-3">
      <Label htmlFor="bps">Splits</Label>
      <Input
        id="user_bps"
        name="user_bps"
        placeholder="100%"
        type="number"
        autoCorrect="off"
        required
        min={0}
        max={100}
        onChange={handleChange}
        onBlur={handleBlur}
        value={splitPercent}
      />
    </div>
  )
}

export default SplitsInput
