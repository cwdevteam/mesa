import { useMediaController } from '@/hooks/useMediaController'
import { DEFAULT_IMAGE } from '@/lib/consts'

const CoverArt = () => {
  const { currentMedia, medias } = useMediaController()

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      height={80}
      width={80}
      src={medias?.[currentMedia]?.avatar || DEFAULT_IMAGE}
      alt="cover art"
      className="rounded-lg"
    />
  )
}

export default CoverArt
