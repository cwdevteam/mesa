import { useProjectProvider } from '@/context/ProjectProvider'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import { toast } from '../ui/use-toast'

const SaveButton = () => {
  const { attest } = usePaymasterAttest()
  const { setCreatingStatus, animationUrl, image } = useProjectProvider()

  const handleClick = async () => {
    if (!animationUrl || !image) return
    setCreatingStatus(true)
    const response = await attest()
    if (response?.error) {
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'default',
      })
    }
    setCreatingStatus(false)
  }

  return (
    <button
      type="button"
      className="border-[1px] border-border-light dark:border-muted-foreground w-[100px] py-1 rounded-lg text-[10px] font-roboto_bold"
      onClick={handleClick}
    >
      Save
    </button>
  )
}

export default SaveButton
