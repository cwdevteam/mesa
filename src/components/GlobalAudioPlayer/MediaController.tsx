'use client'

import React from 'react'
import TimeSliderControls from './TimeSliderControls'
import VolumeControls from './VolumeControls'
import AudioPlayerControls from './AudioPlayerControls'
import { useMediaController } from '@/hooks/useMediaController'
import CoverArt from './CoverArt'

export const MediaController: React.FC = () => {
  const {
    currentMedia,
    currentTime,
    volume,
    medias,
    isPlaying,
    playStatus,
    isMuted,
    audioRef,
    handlePlayPause,
    handleNext,
    handleBack,
    setPlayStatus,
    handleVolumeChange,
    handleSliderChange,
    handleAudioMute,
  } = useMediaController()

  const audio = audioRef.current

  return (
    <div className="w-full dark:bg-black bg-white text-white px-5 py-3 relative">
      <audio ref={audioRef} hidden />
      <div className="flex gap-2">
        <CoverArt />
        <div>
          <div className="dark:text-white text-zinc-900 text-md font-sans hover:underline">
            <b>{medias[currentMedia]?.name}</b>
            <p className="font-roboto text-[10px] text-grey">
              Last Uploaded By. TA
            </p>
          </div>
        </div>
      </div>
      <div className="absolute left-0 top-0 w-full flex justify-center pt-20">
        <div className="w-2/3">
          <AudioPlayerControls
            isPlaying={isPlaying}
            playStatus={playStatus}
            handlePlayPause={handlePlayPause}
            handleNext={handleNext}
            handleBack={handleBack}
            setPlayStatus={setPlayStatus}
            currentMedia={currentMedia}
          />
          <TimeSliderControls
            currentTime={currentTime}
            duration={audio?.duration ?? 0}
            handleSliderChange={handleSliderChange}
          />
        </div>
      </div>
      <div className="absolute left-0 top-0 w-full flex justify-end pt-4">
        <VolumeControls
          isMuted={isMuted}
          volume={volume}
          handleVolumeChange={handleVolumeChange}
          handleAudioMute={handleAudioMute}
        />
      </div>
    </div>
  )
}

export default MediaController
