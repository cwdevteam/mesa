import { useMediaContext } from "@/context/MediaContext";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";
import { useEffect } from "react";

const useProjectMedia = (animationUrl: string) => {
  const { handleAdd } = useMediaContext();

  useEffect(() => {
    const addAnimationToMediaPlayer = () => {
      const media = {
        avatar: "/avatar.png",
        name: "upload.mp3",
        url: getIpfsLink(animationUrl),
      };
      handleAdd(media);
    };

    if (!animationUrl) return;
    addAnimationToMediaPlayer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animationUrl]);
};

export default useProjectMedia;
