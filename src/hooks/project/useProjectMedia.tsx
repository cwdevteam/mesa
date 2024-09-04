import { useMediaContext } from '@/context/MediaContext'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { useEffect } from 'react'

const useProjectMedia = (animationUrl: string, image: string, name: string) => {
  const { handleAdd } = useMediaContext()

  useEffect(() => {
    const addAnimationToMediaPlayer = () => {
      const changes = {
        name,
        url: getIpfsLink(animationUrl),
        avatar: image ? getIpfsLink(image) : '',
      } as any
      handleAdd(changes)
    }

    if (!animationUrl || !name) return
    addAnimationToMediaPlayer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationUrl, name, image])
}

export default useProjectMedia
