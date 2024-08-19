import { PlusCircledIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'

const CreateButton = ({ onClick }: any) => (
  <Button className="inline-flex gap-2" onClick={onClick}>
    <PlusCircledIcon color="currentColor" className="h-4 w-4" />
    <div className="hidden sm:block">Create</div>
  </Button>
)

export default CreateButton
