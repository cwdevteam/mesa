import { useProjectProvider } from '@/context/ProjectProvider'
import { Input } from '../ui/input'
import { useState } from 'react'
import truncateAddress from '@/lib/truncateAddress'
import { Icons } from '../Icons'

const Splits = () => {
  const {
    splits,
    setSplit: setSplits,
    splitPercents,
    setSplitPercents,
    removeSplit,
  } = useProjectProvider()
  const [split, setSplit] = useState('')

  const totalSplitPercent = splitPercents.reduce(
    (partialSum: any, a: any) => partialSum + parseFloat(a),
    0
  )

  const handleChangeSplit = (e: any) => {
    if (e.key === 'Enter') {
      setSplits(split)
      const percent = 100 / (splits.length + 1)
      const newPercents = Array.from({ length: splits.length + 1 }).map(
        () => percent
      )
      setSplitPercents(newPercents)
      setSplit('')
      return
    }
  }

  const handleRemoveSplit = (index: number) => {
    removeSplit(index)
  }

  const handleChangeSplitPercent = (e: any, index: number) => {
    const temp = [...splitPercents]
    temp[index] = e.target.value
    setSplitPercents([...temp])
  }

  return (
    <div className="flex flex-col gap-2">
      <Input
        type="text"
        name="split"
        id="split"
        required
        value={split}
        onChange={(e) => {
          setSplit(e.target.value)
        }}
        onKeyUp={handleChangeSplit}
      />
      {splits.map((split: any, index: number) => (
        <div key={index} className="flex gap-2 items-center justify-between">
          <p className="text-[14px]">{truncateAddress(split)}</p>
          <div className="flex gap-2">
            <Input
              type="number"
              name={`split-percent-${index}`}
              id={`split-percent-${index}`}
              required
              value={splitPercents[index]}
              onChange={(e) => handleChangeSplitPercent(e, index)}
              className="!w-[100px]"
            />
            <button type="button" onClick={() => handleRemoveSplit(index)}>
              <Icons.close className="text-white" />
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-between mt-2">
        Total: <p>{totalSplitPercent}%</p>
      </div>
    </div>
  )
}

export default Splits
