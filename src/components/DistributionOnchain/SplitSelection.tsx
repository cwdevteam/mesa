import { useOnchainDistributionProvider } from '@/context/OnchainDistributionProvider'

const SplitSelection = () => {
  const { activeSplit, setActiveSplit } = useOnchainDistributionProvider()

  return (
    <div className="flex gap-2">
      <button
        type="button"
        className={`${activeSplit && 'border-white'} border py-1 px-2 rounded-sm`}
        onClick={() => setActiveSplit(true)}
      >
        <p className="text-[14px]">Split</p>
      </button>
      <button
        type="button"
        className={`${!activeSplit && 'border-white'} border py-1 px-2 rounded-sm`}
        onClick={() => setActiveSplit(false)}
      >
        <p className="text-[14px]">Someone else</p>
      </button>
    </div>
  )
}

export default SplitSelection
