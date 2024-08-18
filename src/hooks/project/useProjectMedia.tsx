import { useMediaContext } from "@/context/MediaContext";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";
import { useEffect } from "react";

const useProjectMedia = (animationUrl: string, image: string, name: string) => {
  const { handleAdd } = useMediaContext();

  useEffect(() => {
    const addAnimationToMediaPlayer = () => {
      const changes = {
        name,
        url: getIpfsLink(animationUrl),
      } as any;
      handleAdd(changes);
    };

    if (!animationUrl) return;
    addAnimationToMediaPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationUrl]);

  useEffect(() => {
    const addImageToMediaPlayer = () => {
      const changes = {
        avatar: getIpfsLink(image),
        name,
      } as any;
      handleAdd(changes);
    };

    if (!image) return;
    addImageToMediaPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [image]);
};

export default useProjectMedia;
