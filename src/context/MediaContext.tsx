'use client'

import React, { createContext, useContext, useState } from 'react'

import { PlayMode } from '@/lib/enum'
import { MediaProviderProps } from '@/types/const'
import { Media } from '@/types/mesa'

const MediaContext = createContext<
  | {
      medias: Media[]
      currentMedia: number
      setCurrentMedia: (value: number) => void
      isPlaying: boolean
      setIsPlaying: (isPlaying: boolean) => void
      handleRemove: (index: number) => void
      playStatus: PlayMode
      setPlayStatus: (playStatus: number) => void
      handleSongEnded: () => void
    }
  | undefined
>(undefined)

const mockData = [
  {
    avatar: '/avatar.png',
    name: 'horse.mp3',
    url: 'https://ipfs.io/ipfs/QmeVPhqpAhJcdeP6CSFi75GHRFY8HHh7k5Vsn5fAg5SajZ',
    duration: 0,
  },
  {
    avatar: '/avatar.png',
    name: 'cat.mp3',
    url: 'https://ipfs.io/ipfs/QmWGAPKwjUw1AqsEYnYjZyePnGXnBhGfB21D4eeZzFwzhZ',
    duration: 0,
  },
  {
    avatar: '/avatar.png',
    name: 'bird.mp3',
    url: 'https://ipfs.io/ipfs/QmeVPhqpAhJcdeP6CSFi75GHRFY8HHh7k5Vsn5fAg5SajZ',
    duration: 0,
  },
  {
    avatar: '/avatar.png',
    name: 'dog.mp3',
    url: 'https://ipfs.io/ipfs/QmWGAPKwjUw1AqsEYnYjZyePnGXnBhGfB21D4eeZzFwzhZ',
    duration: 0,
  },
]

const MediaProvider = ({ children }: MediaProviderProps) => {
  const [medias, setMedias] = useState<Media[]>(mockData)
  const [currentMedia, setCurrentMedia] = useState<number>(0)
  const [isPlaying, setIsPlaying] = useState<boolean>(false)
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
      setCurrentMedia(currentMedia)
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
        setCurrentMedia,
        isPlaying,
        setIsPlaying,
        handleRemove,
        playStatus,
        setPlayStatus,
        handleSongEnded,
      }}
    >
      {children}
    </MediaContext.Provider>
  )
}

export const useMedia = () => {
  const context = useContext(MediaContext)
  if (typeof context === 'undefined') {
    throw new Error('useMedia must be used within a MediaProvider')
  }
  return context
}

export default MediaProvider
