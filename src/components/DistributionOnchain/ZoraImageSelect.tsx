import { useProjectProvider } from "@/context/ProjectProvider";
import ZoraMediaFile from "./ZoraMediaFile";
import ImageSelect from "../Project/ImageSelect";

const ZoraImageSelect = () => {
  const { image } = useProjectProvider();

  return (
    <div className="w-full">
      {image ? (
        <ZoraMediaFile label="Thumbnail File:" mediaFile={image} />
      ) : (
        <ImageSelect />
      )}
    </div>
  );
};

export default ZoraImageSelect;
