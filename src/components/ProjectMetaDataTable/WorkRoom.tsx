import ImageSelect from '../Project/ImageSelect'
import UploadButton from '../Project/UploadButton'
import { Button } from '../ui/button'

const WorkRoom = () => {
  return (
    <div className="col-span-6 mt-4 border-border-light rounded-lg border-[1px] p-5">
      <div className="flex justify-between w-full items-center">
        <p className="text-base/4 font-roboto_bold text-black dark:text-white">
          Workroom
        </p>
        <Button
          variant="outline"
          className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2 !border-border"
        >
          Version History
        </Button>
      </div>
      <div className="w-full grid grid-cols-12 gap-6">
        <ImageSelect />
        <UploadButton />
      </div>
    </div>
  )
}

export default WorkRoom
