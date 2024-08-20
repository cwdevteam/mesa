'use client'

import React from 'react'
import { useAccount } from 'wagmi'
import MediaController from './MediaController'
import { usePathname } from 'next/navigation'
import { useMediaContext } from '@/context/MediaContext'

export default function MediaPlayer() {
  const { isConnected } = useAccount()
  const { medias } = useMediaContext()
  const pathname = usePathname()

  // No media player for standalone create page
  if (pathname.endsWith('/create')) return null

  return <div>{isConnected && medias?.length > 0 && <MediaController />}</div>
}
