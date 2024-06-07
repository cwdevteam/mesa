import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { Icons } from '../Icons'
import { useMedia } from '@/context/MediaContext'

export interface useAudioPlayerProps {
  audio: HTMLAudioElement | null
  currentTime: number
  setCurrentTime: (currentTime: number) => void
}

export const SheetDemo: React.FC = () => {
  const {
    medias,
    currentMedia,
    setCurrentMedia,
    isPlaying,
    setIsPlaying,
    handleRemove
  } = useMedia()

  const displayText = (text: string) => {
    if (text.length > 10) {
      return text.slice(0, 2) + '...' + text.slice(-2)
    } else {
      return text
    }
  }

  const handlePlayPause = (index: number) => {
    if (index === currentMedia) {
      setIsPlaying(!isPlaying)
    } else {
      setIsPlaying(true)
    }

    setCurrentMedia(index)
  }

  const formatTime = (time: number | undefined) => {
    if (time || time === 0) {
      const hours = Math.floor(time / 3600)
      const minutes = Math.floor((time % 3600) / 60)
      const seconds = Math.floor(time % 60)
      return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(
        2,
        '0'
      )}:${String(seconds).padStart(2, '0')}`
    }
    return '00:00:00'
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">
          <Icons.list />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Music List</SheetTitle>
          <SheetDescription>
            🎵 Your favorite Mesa Music Player 🎧
          </SheetDescription>
        </SheetHeader>

        <div className="py-4 h-[38rem] overflow-auto">
          {medias.map((music, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row sm:h-auto my-5 mx-2 rounded-md border hover:shadow-md border-[#313338] ${
                index === currentMedia &&
                'shadow-[0_2px_2px_rgba(8,_112,_184,_0.7)]'
              } hover:bg-gray-900`}
            >
              <div className="flex justify-center items-center w-full sm:w-[50%] sm:m-2 p-2 sm:p-0 border-b sm:border-b-0 sm:border-r border-[#313338] rounded-md">
                {/* {music.avatar ? (
                  <Image
                    src={music.avatar}
                    alt="music"
                    width={50}
                    height={50}
                    className="h-full"
                  />
                ) : (
                  <></>
                )} */}
              </div>
              <div className="w-full flex flex-col justify-center items-center text-lg group">
                <div className="flex flex-row pt-2 justify-end w-full pr-4"></div>
                <div className="flex h-[50%] justify-center custom-height transition-all items-center duration-300">
                  {displayText(music.name)}
                </div>
                <div className="h-[50%] flex flex-col sm:flex-row justify-center items-center text-lg group">
                  <div className="flex justify-center w-full sm:w-auto items-center group-hover:hidden">
                    {formatTime(music?.duration)}
                  </div>
                  <div className="justify-center items-center w-full sm:w-auto hidden group-hover:flex">
                    <button onClick={() => handlePlayPause(index)}>
                      {isPlaying && index === currentMedia ? (
                        <Icons.voicepause className="mr-5 w-6 h-6 text-zinc-500 hover:text-black dark:hover:text-white" />
                      ) : (
                        <Icons.voiceplay className="mr-5 w-6 h-6 text-zinc-500 hover:text-black dark:hover:text-white" />
                      )}
                    </button>
                    <button onClick={() => handleRemove(index)}>
                      <Icons.delete className="w-5 h-5 text-zinc-500 hover:text-black dark:hover:text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}

export default SheetDemo
