'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Icons } from '@/components/Icons'
import { useAudioPlayer } from '@/hooks/useAudioPlayer'

export interface MediaControllerProps {
  musicMockup: any
}
export interface useAudioPlayerProps {
  audio: HTMLAudioElement | null
  duration: number
  currentTime: number
  setCurrentTime: (currentTime: number) => void
  isPlaying: boolean
  setIsPlaying: (isPlaying: boolean) => void
}

export const MediaController: React.FC<MediaControllerProps> = ({
  musicMockup
}) => {
  const intoClass =
    'w-full sticky bottom-0 dark:bg-black bg-white text-white p-3 z-50 border-t-[1px] border-zinc-500'
  const iconClass =
    'w-4 h-4 text-zinc-400 dark:hover:text-white hover:text-black'

  const {
    audio,
    duration,
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying
  }: useAudioPlayerProps = useAudioPlayer({
    url: musicMockup?.url
  })

  const [volume, setVolume] = useState<number>(1)
  const [isMute, setIsMute] = useState<boolean>(false)

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(
      2,
      '0'
    )}`
  }

  const handlePlayPause = () => {
    if (audio) {
      if (isPlaying) {
        audio.pause()
      } else {
        audio.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleMute = () => {
    if (!audio) {
      return
    }
    if (isMute) {
      setVolume(1)
      audio.volume = 1
    } else {
      setVolume(0)
      audio.volume = 0
    }
    setIsMute(!isMute)
  }

  const handleVolumeChange = (e: any) => {
    const newVolume = parseFloat(e.target.value)
    if (newVolume > 0) {
      setIsMute(false)
    } else {
      setIsMute(true)
    }
    setVolume(newVolume)
    if (audio) {
      audio.volume = newVolume
    }
  }

  const handleSliderChange = (e: any) => {
    if (audio) {
      const newTime = e.target.value
      audio.currentTime = newTime
      setCurrentTime(newTime)
    }
  }

  return (
    <div className={intoClass}>
      <div className="flex items-center gap-2 h-[8%] bottom-0 flex-wrap">
        <div className="flex-1 flex gap-3">
          <Image
            src={musicMockup?.avatar}
            alt=""
            width={50}
            height={50}
            className="h-full"
          />
          <div className="flex flex-col">
            <div className="dark:text-white text-zinc-900 text-md font-sans hover:underline">
              <b>{musicMockup?.name}</b>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-center items-center gap-5">
            <button>
              <Icons.voicesuffle className={iconClass} />
            </button>
            <button>
              <Icons.voiceback className={iconClass} />
            </button>
            {isPlaying ? (
              <button onClick={handlePlayPause} aria-label="Pause">
                <Icons.voicepause className="w-7 h-7 text-zinc-500 hover:text-black dark:hover:text-white" />
              </button>
            ) : (
              <button onClick={handlePlayPause} aria-label="Play">
                <Icons.voiceplay className="w-7 h-7 text-zinc-500 hover:text-black dark:hover:text-white" />
              </button>
            )}
            <button>
              <Icons.voicenext className={iconClass} />
            </button>
            <button>
              <Icons.voicerepeat className={iconClass} />
            </button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className="text-xs text-zinc-500">{formatTime(currentTime)}</p>
            <input
              type="range"
              min="0"
              max={duration}
              minLength={0}
              step="0.01"
              value={currentTime}
              onChange={handleSliderChange}
              onMouseUp={handleSliderChange}
              onKeyUp={handleSliderChange}
              className="h-[3px] w-full bg-zinc-700"
            />
            <p className="text-xs text-zinc-500">{formatTime(duration)}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="flex items-center justify-center gap-2 mr-4 sm:mr-0">
            {isMute ? (
              <button onClick={handleMute}>
                <Icons.voicemute className={iconClass} />
              </button>
            ) : (
              <button onClick={handleMute}>
                <Icons.voiceunmute className={iconClass} />
              </button>
            )}
            <input
              type="range"
              min="0"
              max={1}
              minLength={0}
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="hidden sm:block w-[120px] h-[3px]"
            />
          </div>
          <button>
            <Icons.voiceexpend className={iconClass} />
          </button>
        </div>
      </div>
    </div>
  )
}

export default MediaController
