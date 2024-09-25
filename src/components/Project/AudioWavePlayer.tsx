import React, { useCallback, useRef } from 'react'
import { useWavesurfer } from '@wavesurfer/react'
import { Icons } from '../Icons'

const AudioWavePlayer = ({ src, onCancel }: any) => {
  const containerRef = useRef() as any
  const { wavesurfer, isPlaying } = useWavesurfer({
    container: containerRef,
    height: 30,
    progressColor: '#d2d2d2',
    waveColor: '#DDE1F0',
    url: src,
  })

  const onPlayPause = useCallback(() => {
    wavesurfer && wavesurfer.playPause()
  }, [wavesurfer])

  const cancel = () => {
    if (isPlaying) onPlayPause()
    onCancel()
  }
  return (
    <div className="flex w-fit items-center gap-1">
      <div className="flex items-center gap-1">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange">
          <button type="button" onClick={onPlayPause}>
            {isPlaying ? <Icons.pause /> : <Icons.play />}
          </button>
        </div>
        <div
          className="relative aspect-[585/12] w-[100px]"
          ref={containerRef}
        />
      </div>
      <button type="button" onClick={cancel}>
        <Icons.delete />
      </button>
    </div>
  )
}

export default AudioWavePlayer
