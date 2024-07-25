"use client";

import React from "react";
import TimeSliderControls from "./TimeSliderControls";
import VolumeControls from "./VolumeControls";
import AudioPlayerControls from "./AudioPlayerControls";
import { useMediaController } from "@/hooks/useMediaController";
import CoverArt from "./CoverArt";

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
  } = useMediaController();

  const audio = audioRef.current;

  const intoClass =
    "w-full fixed bottom-0 dark:bg-black bg-white text-white p-3 z-50 border-t-[1px] border-zinc-500";

  return (
    <div className={`${intoClass} ${"overflow-x-auto sm:overflow-x-hidden"}`}>
      <div className="flex items-center gap-2 h-[8%] bottom-0 flex-wrap min-w-[500px]">
        <audio ref={audioRef} hidden />
        <div className="flex-1 flex gap-3">
          <CoverArt />
          <div className="flex justify-center items-center flex-col">
            <div className="dark:text-white text-zinc-900 text-md font-sans hover:underline">
              <b>{medias[currentMedia]?.name}</b>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-2">
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
        <div className="flex-1 flex items-center justify-end gap-3">
          <VolumeControls
            isMuted={isMuted}
            volume={volume}
            handleVolumeChange={handleVolumeChange}
            handleAudioMute={handleAudioMute}
          />
        </div>
      </div>
    </div>
  );
};

export default MediaController;
