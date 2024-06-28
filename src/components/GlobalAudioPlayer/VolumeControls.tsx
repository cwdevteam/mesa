import React from 'react'
import MediaSheet from '../Sheet/Mediasheet'
import { Icons } from '../Icons'
import { VolumeControlsProps } from '@/types/const'

const VolumeControls = ({
  isMuted,
  volume,
  handleAudioMute,
  handleVolumeChange
}: VolumeControlsProps) => {
  const iconClass =
    'w-4 h-4 text-zinc-400 dark:hover:text-white hover:text-black'
  return (
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
        value={volume}
        onChange={e => handleVolumeChange(parseFloat(e.target.value))}
        className="hidden sm:block w-[120px] h-[3px]"
      />
      <MediaSheet />
    </div>
  )
}

export default VolumeControls
