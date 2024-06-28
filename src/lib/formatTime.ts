export const formatTime = (time?: number) => {
  if (time === undefined || isNaN(time)) return '00:00'

  const hours = Math.floor(time / 3600)
  const minutes = Math.floor((time % 3600) / 60)
  const seconds = Math.floor(time % 60)

  const formattedTime = [minutes, seconds]
    .map(unit => String(unit).padStart(2, '0'))
    .join(':')

  return hours > 0
    ? `${String(hours).padStart(2, '0')}:${formattedTime}`
    : formattedTime
}
