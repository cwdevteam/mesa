"use client";

import React, { createContext, useContext, useRef, useState } from "react";
import { PlayMode } from "@/lib/enum";
import { MediaProviderProps } from "@/types/const";
import { Media } from "@/types/mesa";
import { MediaMockData } from "./Media";

const MediaContext = createContext<
  | {
      medias: Media[];
      currentMedia: number;
      isPlaying: boolean;
      playStatus: PlayMode;
      audioRef: React.RefObject<HTMLAudioElement>;
      setCurrentMedia: (value: number) => void;
      setIsPlaying: (isPlaying: boolean) => void;
      handleRemove: (index: number) => void;
      handleAdd: (meda: Media) => void;
      setPlayStatus: (playStatus: number) => void;
      handleSongEnded: () => void;
    }
  | undefined
>(undefined);

const MediaProvider = ({ children }: MediaProviderProps) => {
  const [medias, setMedias] = useState<Media[]>(MediaMockData);
  const [currentMedia, setCurrentMedia] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playStatus, setPlayStatus] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleRemove = (index: number) => {
    if (index >= medias.length) return;

    const updatedMedias = [...medias];
    updatedMedias.splice(index, 1);
    setMedias(updatedMedias);

    if (index === currentMedia) {
      setCurrentMedia(0);
      setIsPlaying(false);
    } else if (currentMedia > index) {
      setCurrentMedia(currentMedia - 1);
    }
  };

  const handleAdd = (changes: any) => {
    const newMedias = [...medias];
    let latest = newMedias.pop();
    latest = {
      ...latest,
      ...changes,
    } as Media;
    setMedias([...newMedias, latest]);
    setCurrentMedia(medias.length - 1);
  };

  const handleSongEnded = () => {
    if (playStatus === PlayMode.CYCLE) {
      if (medias.length > currentMedia + 1) {
        setCurrentMedia(currentMedia + 1);
      } else if (currentMedia + 1 === medias.length) {
        setCurrentMedia(0);
      }
    } else if (playStatus === PlayMode.INFINITE) {
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else if (playStatus === PlayMode.RANDOM) {
      const randomNumber = Math.floor(Math.random() * medias.length);
      setCurrentMedia(randomNumber);
      setIsPlaying(true);
    }
  };

  return (
    <MediaContext.Provider
      value={{
        medias,
        currentMedia,
        playStatus,
        isPlaying,
        audioRef,
        setCurrentMedia,
        setIsPlaying,
        handleAdd,
        handleRemove,
        setPlayStatus,
        handleSongEnded,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
};

export const useMediaContext = () => {
  const context = useContext(MediaContext);
  if (typeof context === "undefined") {
    throw new Error("useMedia must be used within a MediaProvider");
  }
  return context;
};

export default MediaProvider;
