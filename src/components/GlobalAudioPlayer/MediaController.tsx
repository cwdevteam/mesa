'use client'

import React from 'react'
import { useAccount } from 'wagmi'

import MediaSheet from '../Sheet/Mediasheet'
import { useMediaController } from '@/hooks/useMediaController'
import { Icons } from '@/components/Icons'
import { PlayMode } from '@/lib/enum'
import { formatTime } from '@/lib/formatTime'

export const MediaController: React.FC = () => {
  const { isConnected } = useAccount()
  const {
    currentMedia,
    medias,
    isPlaying,
    playStatus,
    isMuted,
    audioRef,
    handlePlayPause,
    handleNext,
    handleBack,
    setPlayStatus,
    handleVolumeChange,
    handleSliderChange,
    handleAudioMute
  } = useMediaController()

  if (!isConnected) {
    return null
  }

  const audio = audioRef.current

  const intoClass =
    'w-full fixed bottom-0 dark:bg-black bg-white text-white p-3 z-50 border-t-[1px] border-zinc-500'
  const iconClass =
    'w-4 h-4 text-zinc-400 dark:hover:text-white hover:text-black'

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
            <button
              className="w-7"
              onClick={() => setPlayStatus((playStatus + 1) % 3)}
            >
              {playStatus === PlayMode.CYCLE && (
                <Icons.voicerepeat className="iconsClass" />
              )}
              {playStatus === PlayMode.INFINITE && <Icons.voiceinfinite />}
              {playStatus === PlayMode.RANDOM && (
                <Icons.voicesuffle className="iconsClass" />
              )}
            </button>
          </div>
          <div className="flex justify-center items-center gap-2">
            <p className="text-xs text-zinc-500">
              {formatTime(audio?.currentTime)}
            </p>
            <input
              type="range"
              min="0"
              max={audio?.duration ?? 0}
              minLength={0}
              step="0.01"
              value={audio?.currentTime ?? 0}
              onChange={e => handleSliderChange(Number(e.target.value))}
              className="h-[3px] w-full bg-zinc-700"
            />
            <p className="text-xs text-zinc-500">
              {formatTime(audio?.duration)}
            </p>
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
              onChange={e => handleVolumeChange(parseFloat(e.target.value))}
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
