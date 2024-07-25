import { useMediaController } from "@/hooks/useMediaController";

const DEFAULT_IMAGE =
  "https://ipfs.decentralized-content.com/ipfs/bafkreicih4xebijdfnhfbaickrpvchtys3i2f5hgjmbntciov2tqvlt5qy";

const CoverArt = () => {
  const { currentMedia, medias } = useMediaController();

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      height={50}
      width={50}
      src={medias?.[currentMedia]?.avatar || DEFAULT_IMAGE}
      alt="cover art"
      className="rounded-lg"
    />
  );
};

export default CoverArt;
