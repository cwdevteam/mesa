import { useProjectProvider } from '@/context/ProjectProvider'
import { Input } from '../ui/input'
import { useState } from 'react'
import truncateAddress from '@/lib/truncateAddress'
import { Icons } from '../Icons'
import { SPLIT_RECIPIENT_MAX_DECIMALS } from '@/lib/consts'
import { round, sumBy } from 'lodash'
import { NumericFormat } from 'react-number-format'

const Splits = () => {
  const {
    splits,
    setSplit: setSplits,
    splitPercents,
    setSplitPercents,
    removeSplit,
    totalSplitPercent,
  } = useProjectProvider()
  const [split, setSplit] = useState('')

  const getPercents = (num: any) => {
    const roundedSplit = round(100 / num, SPLIT_RECIPIENT_MAX_DECIMALS)
    const roundedSplitLeftover = round(
      100 - roundedSplit * num,
      SPLIT_RECIPIENT_MAX_DECIMALS
    )
    const newPercents = Array.from({ length: num }).map(
      (_, index) => roundedSplit + (index == 0 ? roundedSplitLeftover : 0)
    )

    return newPercents
  }

  const handleChangeSplit = (e: any) => {
    if (e.key === 'Enter') {
      if (splits.includes(split)) return
      setSplits(split)
      const newPercents = getPercents(splits.length + 1)
      setSplitPercents(newPercents)
      setSplit('')
      return
    }
  }

  const handleRemoveSplit = (index: number) => {
    const newPercents = getPercents(splits.length - 1)
    setSplitPercents(newPercents)
    removeSplit(index)
  }

  const handleChangeSplitPercent = (floatValue: any, index: number) => {
    const temp = [...splitPercents]
    temp[index] = floatValue
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
            <NumericFormat
              decimalScale={4}
              suffix="%"
              placeholder={'0.00%'}
              onValueChange={({ floatValue }) => {
                handleChangeSplitPercent(floatValue, index)
              }}
              value={splitPercents[index]}
              className="!w-[100px] border p-1 rounded-sm text-[14px] !outline-none"
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
