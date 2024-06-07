import { useState, useEffect } from 'react'
import { useMedia } from '@/context/MediaContext'

interface UseAudioPlayerProps {
  url: string
  volume?: number
}

export const useAudioPlayer = ({ url, volume = 1 }: UseAudioPlayerProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const {
    isPlaying,
    setIsPlaying,
    handleSongEnded
  } = useMedia()

  useEffect(() => {
    if (audio) {
      audio.pause()
      audio.src = url
      audio.load()
      audio.currentTime = currentTime
      audio.volume = volume

      const handleLoadedMetadata = () => {
        if (isPlaying) {
          audio.play()
        }
      }

      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime)
      }

      const handleEnded = () => {
        setCurrentTime(0)
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
  }, [audio, url, currentTime, volume, isPlaying, setIsPlaying])

  useEffect(() => {
    const newAudio = new Audio(url)
    setAudio(newAudio)

    return () => {
      newAudio.pause()
      newAudio.src = ''
    }
  }, [url])

  useEffect(() => {
    if (audio) {
      if (isPlaying) {
        audio.play()
      } else {
        audio.pause()
      }
    }
  }, [isPlaying, audio])

  useEffect(() => {
    if (audio) {
      audio.volume = volume
    }
  }, [volume, audio])

  return {
    audio,
    currentTime,
    setCurrentTime
  }
}
