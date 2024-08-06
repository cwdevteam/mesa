"use client";

import { useProjectProvider } from "@/context/ProjectProvider";
import ZoraMediaFile from "./ZoraMediaFile";
import ZoraImageSelect from "./ZoraImageSelect";

const MediaUploads = () => {
  const { animationUrl } = useProjectProvider();

  return (
    <div className="flex justify-between w-full">
      <ZoraImageSelect />
      <ZoraMediaFile mediaFile={animationUrl} />
    </div>
  );
};

export default MediaUploads;
