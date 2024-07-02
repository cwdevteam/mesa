import React from 'react'
import { Icons } from '../Icons'
import { AudioPlayerProps } from '@/types/const'
import { PlayMode } from '@/lib/enum'

const AudioPlayerControls = ({
  isPlaying,
  playStatus,
  currentMedia,
  handleBack,
  handleNext,
  setPlayStatus,
  handlePlayPause
}: AudioPlayerProps) => {
  const iconClass =
    "w-4 h-4 text-zinc-400 dark:hover:text-white hover:text-black";
  return (
    <div className="flex justify-center items-center gap-5 ml-12">
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
          <Icons.shuffle className="iconsClass" />
        )}
      </button>
    </div>
  )
}

export default AudioPlayerControls
