import { useEffect, useRef } from 'react'

import { useMediaContext } from '@/context/MediaContext'
import useAudio from '@/hooks/useAudio'

export const useMediaController = () => {
  const {
    currentMedia,
    medias,
    isPlaying,
    setIsPlaying,
    setCurrentMedia,
    playStatus,
    setPlayStatus,
    handleSongEnded
  } = useMediaContext()

  const audioRef = useRef<HTMLAudioElement>(null)

  const { setRefresh } = useAudio({
    audio: audioRef.current,
    isPlaying,
    handleSongEnded
  })

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = medias[currentMedia]?.url
    }
  }, [currentMedia, medias, audioRef.current])

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
    }
  }, [isPlaying, audioRef.current])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
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

  const handleVolumeChange = (newVolume: number) => {
    if (audioRef.current) {
      audioRef.current.volume = newVolume
      setRefresh(prev => prev + 1)
    }
  }

  const handleSliderChange = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
      setRefresh(prev => prev + 1)
    }
  }

  const isMuted = audioRef.current?.volume === 0

  const handleAudioMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = 1
      } else {
        audioRef.current.volume = 0
      }
      setRefresh(prev => prev + 1)
    }
  }

  return {
    audioRef,
    currentMedia,
    medias,
    isPlaying,
    playStatus,
    isMuted,
    handleAudioMute,
    handlePlayPause,
    handleNext,
    handleBack,
    setPlayStatus,
    handleVolumeChange,
    handleSliderChange
  }
}
