import MediaPlayer from '../GlobalAudioPlayer/MediaPlayer'
import ImageSelect from '../Project/ImageSelect'
import UploadButton from '../Project/UploadButton'
import SaveButton from './SaveButton'

const WorkRoom = () => {
  return (
    <div className="col-span-6 mt-4 border-border-light dark:border-muted rounded-lg border-[1px] py-5">
      <div className="flex justify-between w-full items-center px-5">
        <p className="text-base/4 font-roboto_bold text-black dark:text-white">
          Workroom
        </p>
      </div>
      <div className="w-full grid grid-cols-12">
        <ImageSelect />
        <UploadButton />
        <div className="col-span-12 flex justify-end px-5 pb-2">
          <SaveButton />
        </div>
        <div className="col-span-12 border-t border-border">
          <MediaPlayer />
        </div>
      </div>
    </div>
  )
}

export default WorkRoom
