'use client'
import React from 'react'
import { useAccount } from 'wagmi'
import MediaProvider from '@/context/MediaContext'
import MediaController from './MediaController'

export default function MediaPlayer() {
  const {isConnected} = useAccount()
  return (
    <MediaProvider>
      {isConnected && <MediaController />}
    </MediaProvider>
  )
}
