import React from 'react'

import MediaProvider from '@/context/MediaContext'
import MediaController from './MediaController'

export default function MediaPlayer() {
  return (
    <MediaProvider>
      <MediaController />
    </MediaProvider>
  )
}
