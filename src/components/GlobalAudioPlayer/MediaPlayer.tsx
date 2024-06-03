import MediaProvider from '@/context/MediaContext'
import MediaController from './MediaController'

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
