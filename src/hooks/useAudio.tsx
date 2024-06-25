import { useEffect, useState } from 'react'

import { UseAudioProps } from '@/types/const'

const useAudio = ({ audio, isPlaying, handleSongEnded }: UseAudioProps) => {
  const [_, setRefresh] = useState<number>(0)

  useEffect(() => {
    if (!audio) return

    const handleLoadedMetadata = () => {
      if (isPlaying) audio.play()
    }

    const handleTimeUpdate = () => setRefresh(prev => prev + 1)

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
  }, [audio, handleSongEnded, isPlaying])

  return { setRefresh }
}

export default useAudio
