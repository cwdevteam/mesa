import { useEffect, useRef, useState } from 'react'

import { useMediaContext } from '@/context/MediaContext'
import useAudio from './useAudio'

export const useMediaController = () => {
  const {
    currentMedia,
    medias,
    isPlaying,
    playStatus,
    audioRef,
    setIsPlaying,
    setCurrentMedia,
    setPlayStatus,
    handleSongEnded
  } = useMediaContext()

  const [currentTime, setCurrentTime] = useState<number>(0)
  const [volume, setVolume] = useState<number>(1)

  useAudio({
    audio: audioRef.current,
    isPlaying,
    setCurrentTime,
    setVolume,
    handleSongEnded
  })

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = medias[currentMedia]?.url
    }
  }, [currentMedia, medias])

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
    }
  }

  const handleSliderChange = (newTime: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
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
    }
  }

  return {
    audioRef,
    currentTime,
    volume,
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
