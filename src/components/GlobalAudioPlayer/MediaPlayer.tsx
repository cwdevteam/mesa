import MediaProvider from '@/context/MediaContext'
import MediaController from './MediaController'
import { create } from 'ipfs-http-client'

const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' })

const musicMockup = [
  {
    avatar: '/audio.png',
    name: 'horse.mp3',
    url: ''
  },
  {
    avatar: '/audio.png',
    name: 'horse.mp3',
    url: ''
  },
  {
    avatar: '/audio.png',
    name: 'horse.mp3',
    url: ''
  }
]

export default function MediaPlayer() {
  return (
    <MediaProvider>
      <MediaController musicMockup={musicMockup} />
    </MediaProvider>
  )
}
