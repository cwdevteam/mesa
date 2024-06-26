import { useEffect, useState } from 'react'

import { UseAudioProps } from '@/types/const'

const useAudio = ({
  audio,
  isPlaying,
  setCurrentTime,
  handleSongEnded
}: UseAudioProps) => {
  useEffect(() => {
    if (!audio) return

    const handleLoadedMetadata = () => {
      if (isPlaying) audio.play()
    }

    const handleEnded = () => {
      handleSongEnded()
    }

    const handleTimeUpdate = () => setCurrentTime(audio.currentTime)

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('loadedmetadata', handleLoadedMetadata)
    audio.addEventListener('ended', handleEnded)

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('timeupdate', handleTimeUpdate)
    }
  }, [audio, handleSongEnded, isPlaying])

  return {}
}

export default useAudio
