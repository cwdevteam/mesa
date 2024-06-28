import React from 'react'
import { formatTime } from '@/lib/formatTime'
import { TimeSliderControllerProps } from '@/types/const'

const TimeSliderControls = ({
  currentTime,
  duration,
  handleSliderChange
}: TimeSliderControllerProps) => (
  <div className="flex justify-center items-center gap-2">
    <p className="text-xs text-zinc-500">{formatTime(currentTime)}</p>
    <input
      type="range"
      min="0"
      max={duration}
      minLength={0}
      step="0.01"
      value={currentTime}
      onChange={e => handleSliderChange(Number(e.target.value))}
      className="h-[3px] w-full bg-zinc-700"
    />
    <p className="text-xs text-zinc-500">{formatTime(duration)}</p>
  </div>
)

export default TimeSliderControls
