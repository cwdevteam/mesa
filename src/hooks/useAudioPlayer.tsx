import { useState, useEffect } from 'react'

interface UseAudioPlayerProps {
  url: string
  volume?: number
  isMute?: boolean
}

export const useAudioPlayer = ({
  url,
  volume = 1,
  isMute = false
}: UseAudioPlayerProps) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const [duration, setDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)

  useEffect(() => {
    if (url) {
      if (audio) {
        audio.pause()
      }
      const newAudio = new Audio(url)
      newAudio.volume = volume
      newAudio.muted = isMute
      setAudio(newAudio)
    }
  }, [url])

  useEffect(() => {
    if (audio) {
      setIsPlaying(true)
      setCurrentTime(0)

      audio.addEventListener('loadedmetadata', () => {
        setDuration(audio.duration)
        audio.play()
      })

      const updateTime = () => {
        setCurrentTime(audio.currentTime)
      }

      const handleEnded = () => {
        setCurrentTime(0)
        setIsPlaying(false)
      }

      audio.addEventListener('timeupdate', updateTime)
      audio.addEventListener('ended', handleEnded)

      return () => {
        audio.removeEventListener('timeupdate', updateTime)
        audio.removeEventListener('ended', handleEnded)
      }
    }
  }, [audio])

  return {
    audio,
    duration,
    currentTime,
    setCurrentTime,
    isPlaying,
    setIsPlaying
  }
}
