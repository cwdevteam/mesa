import { ReactNode } from 'react'

import { PlayMode } from '@/lib/enum'
import { Address } from 'viem'
import { Credit } from './projectMetadataForm'

export type OnchainDistributionProtocol = 'Zora' | 'Sound'
export type ProjectTab =
  | 'project'
  | 'contract'
  | 'setting'
  | OnchainDistributionProtocol

export interface ProjectPageProps {
  params: {
    lang: Locale
    id: string
  }
}

export interface ProjectDetailsCardProps {
  projectName: string
  projectDescription: string
}

export interface UserContextType {
  user: UserDetailsProps | null
  setUser: React.Dispatch<React.SetStateAction<UserDetailsProps | null>>
  fetchUser: () => void
}

export interface UserDetailsProps {
  avatar_url: string | null
  legal_name: string | null
  userId: string
  email: string | null
  artistname: string | null
  id: string
  addresses: Address[] | null
}

export interface UserData {
  name: string
  contractType: string
  role: string
  bps: string
}
export interface UserMatrixCardProps {
  data: Credit
  creditIndex: number
}
export interface ProjectCollaboratorsProps {
  project: any
}
export interface MediaControllerProps {
  musicMockup: {
    avatar: string
    name: string
    url: string
  }[]
}
export interface UseAudioPlayerProps {
  url: string
  volume?: number
}
export interface MediaProviderProps {
  children: ReactNode
}

export interface UseAudioProps {
  audio: HTMLAudioElement | null
  isPlaying: boolean
  setCurrentTime: (value: number) => void
  setVolume: (value: number) => void
  handleSongEnded: () => void
}

export interface TimeSliderControllerProps {
  currentTime: number
  duration: number
  handleSliderChange: (value: number) => void
}

export interface VolumeControlsProps {
  isMuted: boolean
  volume: number
  handleVolumeChange: (value: number) => void
  handleAudioMute: () => void
}
export interface AudioPlayerProps {
  isPlaying: boolean
  playStatus: PlayMode
  currentMedia: number
  handlePlayPause: () => void
  handleNext: (currentMedia: number) => void
  handleBack: (currentMedia: number) => void
  setPlayStatus: (playStatus: PlayMode) => void
}

export interface PaymastersProviderProps {
  children: ReactNode
}

export interface PaymasterContextProps {
  capabilities: any
}

export interface ConnectButtonProps {
  showTextInMobile: boolean
}

export type ProjectIDType = {
  id: Address
}
