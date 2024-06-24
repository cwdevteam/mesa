'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useAccount } from 'wagmi'

import { useMedia } from '@/context/MediaContext'
import MediaSheet from '../Sheet/Mediasheet'
import { Icons } from '@/components/Icons'
import { formatTime } from '@/lib/utils'
import { PlayMode } from '@/lib/enum'

export const MediaController: React.FC = () => {
  const intoClass =
    'w-full fixed bottom-0 dark:bg-black bg-white text-white p-3 z-50 border-t-[1px] border-zinc-500'
  const iconClass = 'w-4 h-4 text-zinc-400 dark:hover:text-white hover:text-black'
  const [refresh, setRefresh] = useState<number>(0)
  const audioRef = useRef<HTMLAudioElement>(null)
  const audio = audioRef.current
  const { isConnected } = useAccount()
  const {
    currentMedia,
    medias,
    isPlaying,
    setIsPlaying,
    setCurrentMedia,
    playStatus,
    setPlayStatus,
    handleSongEnded,
  } = useMedia()

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.src = medias[currentMedia]?.url
    }
  }, [currentMedia, medias, audio])

  useEffect(() => {
    if (audio) {
      const handleLoadedMetadata = () => {
        if (isPlaying) {
          audio.play()
        }
      }

      const handleTimeUpdate = () => {
        setRefresh(prev => prev + 1)
      }

      const handleEnded = () => {
        setRefresh(prev => prev + 1)
        handleSongEnded()
      }

      audio.addEventListener('loadedmetadata', handleLoadedMetadata)
      audio.addEventListener('timeupdate', handleTimeUpdate)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
        audio.removeEventListener('timeupdate', handleTimeUpdate)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [audio, medias, currentMedia, handleSongEnded])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const isMuted = audio?.volume === 0

  const handleAudioMute = () => {
    if (audio) {
      if (isMuted) {
        audio.volume = 1
      } else {
        audio.volume = 0
      }
      setRefresh(prev => prev + 1)
    }
  }

  const handleNext = (index: number) => {
    if (medias.length === index + 1) {
      setCurrentMedia(0)
    } else {
      setCurrentMedia(index + 1)
    }
    setIsPlaying(true)
  }

  const handleBack = (index: number) => {
    if (index === 0) {
      setCurrentMedia(medias.length - 1)
    } else {
      setCurrentMedia(index - 1)
    }
    setIsPlaying(true)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    if (audio) {
      audio.volume = newVolume
      setRefresh(prev => prev + 1)
    }
  }

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audio) {
      const newTime = e.target.value
      audio.currentTime = Number(newTime)
      setRefresh(prev => prev + 1)
    }
  }

  if (!isConnected) {
    return null
  }

  return (
    <div className={intoClass}>
      <div className="flex items-center gap-2 h-[8%] bottom-0 flex-wrap">
        <audio ref={audioRef} hidden />
        <div className="flex-1 flex gap-3">
          <Icons.radio />
          <div className="flex justify-center items-center flex-col">
            <div className="dark:text-white text-zinc-900 text-md font-sans hover:underline">
              <b>{medias[currentMedia]?.name}</b>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
          <div className="flex justify-center items-center gap-5">
            <button onClick={() => handleBack(currentMedia)}>
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
            <button onClick={() => handleNext(currentMedia)}>
              <Icons.voicenext className={iconClass} />
            </button>
            <button onClick={() => setPlayStatus((playStatus + 1) % 3)}>
              {playStatus === PlayMode.CYCLE && <Icons.voicerepeat className="iconsClass" />}
              {playStatus === PlayMode.INFINITE && <Icons.voiceinfinite />}
              {playStatus === PlayMode.RANDOM && <Icons.voicesuffle className="iconsClass" />}
            </button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className="text-xs text-zinc-500">{formatTime(audio?.currentTime)}</p>
            <input
              type="range"
              min="0"
              max={audio?.duration ?? 0}
              minLength={0}
              step="0.01"
              value={audio?.currentTime ?? 0}
              onChange={handleSliderChange}
              className="h-[3px] w-full bg-zinc-700"
            />
            <p className="text-xs text-zinc-500">{formatTime(audio?.duration)}</p>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end gap-3">
          <div className="flex items-center justify-center gap-2 mr-4 sm:mr-0">
            {isMuted ? (
              <button onClick={handleAudioMute}>
                <Icons.voicemute className={iconClass} />
              </button>
            ) : (
              <button onClick={handleAudioMute}>
                <Icons.voiceunmute className={iconClass} />
              </button>
            )}
            <input
              type="range"
              min="0"
              max={1}
              minLength={0}
              step="0.01"
              value={audio?.volume}
              onChange={handleVolumeChange}
              className="hidden sm:block w-[120px] h-[3px]"
            />
            <MediaSheet />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaController
