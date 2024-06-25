'use client'

import React, { createContext, useContext, useState } from 'react'
import { PlayMode } from '@/lib/enum'
import { MediaProviderProps } from '@/types/const'
import { Media } from '@/types/mesa'
import MediaMockData from './Media.json'

const MediaContext = createContext<
  | {
      medias: Media[]
      currentMedia: number
      playStatus: PlayMode
      refreshAudio: number
      isPlaying: boolean
      setCurrentMedia: (value: number) => void
      setIsPlaying: (isPlaying: boolean) => void
      handleRemove: (index: number) => void
      setPlayStatus: (playStatus: number) => void
      handleSongEnded: () => void
    }
  | undefined
>(undefined)

const MediaProvider = ({ children }: MediaProviderProps) => {
  const [medias, setMedias] = useState<Media[]>(MediaMockData)
  const [currentMedia, setCurrentMedia] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
  const [refreshAudio, setRefreshAudio] = useState<number>(0)
  const [playStatus, setPlayStatus] = useState<number>(0)

  const handleRemove = (index: number) => {
    if (index >= medias.length) return

    const updatedMedias = [...medias]
    updatedMedias.splice(index, 1)
    setMedias(updatedMedias)

    if (index === currentMedia) {
      setCurrentMedia(0)
      setIsPlaying(false)
    } else if (currentMedia > index) {
      setCurrentMedia(currentMedia - 1)
    }
  }

  const handleSongEnded = () => {
    if (playStatus === PlayMode.CYCLE) {
      if (medias.length > currentMedia + 1) {
        setCurrentMedia(currentMedia + 1)
      } else if (currentMedia + 1 === medias.length) {
        setCurrentMedia(0)
      }
    } else if (playStatus === PlayMode.INFINITE) {
      setRefreshAudio(prev => prev + 1)
    } else if (playStatus === PlayMode.RANDOM) {
      const randomNumber = Math.floor(Math.random() * medias.length)
      setCurrentMedia(randomNumber)
    }
  }

  return (
    <MediaContext.Provider
      value={{
        medias,
        currentMedia,
        playStatus,
        isPlaying,
        refreshAudio,
        setCurrentMedia,
        setIsPlaying,
        handleRemove,
        setPlayStatus,
        handleSongEnded
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export const useMediaContext = () => {
  const context = useContext(MediaContext)
  if (typeof context === 'undefined') {
    throw new Error('useMedia must be used within a MediaProvider')
  }
  return context
}

export default MediaProvider
