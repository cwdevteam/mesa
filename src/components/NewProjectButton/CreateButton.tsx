import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { useUserProvider } from '@/context/UserProvider'

const CreateButton = ({ onClick }: any) => {
  const { user } = useUserProvider()

  return (
    <Button className="inline-flex gap-2" onClick={onClick} disabled={!user}>
      <PlusCircledIcon color="currentColor" className="h-4 w-4" />
      <div className="hidden sm:block">Create</div>
    </Button>
  )
}

export default CreateButton
