import React from 'react'

import { useMediaContext } from '@/context/MediaContext'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Icons } from '../Icons'

export const MediaSheet: React.FC = () => {
  const { medias, currentMedia, setCurrentMedia, isPlaying, setIsPlaying, handleRemove } =
    useMediaContext()

  const displayText = (text: string) => {
    if (text.length > 10) {
      return text.slice(0, 2) + '...' + text.slice(-2)
    }
    return text
  }

  const handlePlayPause = (index: number) => {
    if (index === currentMedia) {
      setIsPlaying(!isPlaying)
    } else {
      setIsPlaying(true)
    }

    setCurrentMedia(index)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="border-none pl-2" variant={'link'}>
          <Icons.musiclist />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Music List</SheetTitle>
          <SheetDescription>🎵 Your favorite Mesa Music Player 🎧</SheetDescription>
        </SheetHeader>

        <div className="py-4 h-[38rem] overflow-auto">
          {medias.map((music, index) => (
            <div
              key={index}
              className={`flex flex-col sm:flex-row sm:h-auto my-5 mx-2 rounded-md border hover:shadow-md border-[#313338] ${
                index === currentMedia && 'shadow-[0_2px_2px_rgba(8,_112,_184,_0.7)]'
              } hover:bg-gray-600`}
            >
              <div className="flex justify-center items-center w-full sm:w-[50%] sm:m-2 p-2 sm:p-0 border-b sm:border-b-0 sm:border-r border-[#313338] rounded-md"></div>
              <div className="w-full flex flex-col justify-center items-center text-lg group">
                <div className="flex flex-row pt-2 justify-end w-full pr-4"></div>
                <div className="flex h-[50%] justify-center custom-height transition-all items-center duration-300">
                  {displayText(music.name)}
                </div>
                <div className="h-[2rem] flex flex-col sm:flex-row justify-center items-center text-lg group">
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

export default MediaSheet
