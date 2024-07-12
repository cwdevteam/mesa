import { ReactNode } from "react";

import { Locale } from "@/../i18n.config";
import { PlayMode } from "@/lib/enum";
import { Address } from "viem";
import { ProjectUserProps } from "@/components/ProjectCollaborators/types";

export type ProjectTab = "project" | "contract" | "setting";

export interface ProjectPageProps {
  params: {
    lang: Locale;
    id: string;
  };
}

export interface ProjectDetailsComponentProps {
  project: any;
  setTabContent: any;
}

export interface ProjectDetailsCardProps {
  projectName: string;
  projectDescription: string;
}

export interface ContractDetailsPageProps {
  project: {
    name: string;
    description: string;
    collaborators: {
      name: string;
      contractType: string;
      role: string;
      bps: string;
    }[];
  };
  contractTime: string | null;
  contractId: string | undefined;
  contractHistories?: {
    projectUser: { user_name: string };
    created_at: string;
  }[];
}

export interface UserContextType {
  user: UserDetailsProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserDetailsProps | null>>;
  fetchUser: () => void;
}

export interface UserDetailsProps {
  avatar_url: string | null;
  full_name: string | null;
  userId: string;
  username: string | null;
  website: string | null;
  id: string;
  addresses: Address[] | null;
}

export interface UserData {
  name: string;
  contractType: string;
  role: string;
  bps: string;
}
export interface UserMatrixCardProps {
  data: UserData;
}
export interface ProjectCollaboratorsProps {
  project: any;
}
export interface MediaControllerProps {
  musicMockup: {
    avatar: string;
    name: string;
    url: string;
  }[];
}
export interface UseAudioPlayerProps {
  url: string;
  volume?: number;
}
export interface MediaProviderProps {
  children: ReactNode;
}

export interface UseAudioProps {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  setCurrentTime: (value: number) => void;
  setVolume: (value: number) => void;
  handleSongEnded: () => void;
}

export interface TimeSliderControllerProps {
  currentTime: number;
  duration: number;
  handleSliderChange: (value: number) => void;
}

export interface VolumeControlsProps {
  isMuted: boolean;
  volume: number;
  handleVolumeChange: (value: number) => void;
  handleAudioMute: () => void;
}
export interface AudioPlayerProps {
  isPlaying: boolean;
  playStatus: PlayMode;
  currentMedia: number;
  handlePlayPause: () => void;
  handleNext: (currentMedia: number) => void;
  handleBack: (currentMedia: number) => void;
  setPlayStatus: (playStatus: PlayMode) => void;
}

export interface PaymastersProviderProps {
  children: ReactNode;
}

export interface PaymasterContextProps {
  writeContracts: any;
  capabilities: any;
  id: string | undefined;
}

export interface ConnectButtonProps {
  showTextInMobile: boolean;
}

export interface User {
  id: string;
  email: string;
  username: string;
  avatar: string;
}

interface UserProps {
  id: string;
  email: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  nick_name: string;
  password: string;
  token: string;
  aud: boolean;
  verified_at: string;
  avatar: any;
  created_at: string;
  updated_at: Date;
}

interface ProjectProps {
  id: string;
  title: string;
  description: string;
  created_by: string;
  created_at: Date;
  update_at: Date;
}

interface Roles {
  id: string;
  project_user_id: string;
  contract_type: string;
  user_role: string;
  user_bps: number;
  created_at: Date;
  update_at: Date;
}

interface ProjectInvitationProps {
  id: string;
  project_id: string;
  user_id: string;
  user_role: "Owner" | "Artist";
  status: "Accepted" | "Pending" | "Rejected" | "Closed";
  user_name?: string;
  contract_type?: string;
  description?: string;
  user_email?: string;
  created_by: string;
  user_bps: number;
  created_at: Date;
  update_at: Date;
}

export type ProjectType = ProjectProps & {
  projectUsers: (ProjectUserProps & {
    user: UserProps;
    roles: Roles[];
  })[];
  projectInvitations: ProjectInvitationProps[];
};
