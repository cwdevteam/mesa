"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectProvider } from "@/context/ProjectProvider";
import { uploadFile } from "@/lib/ipfs/uploadToIpfs";

const ImageSelect = () => {
  const { setImage } = useProjectProvider();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const { uri } = await uploadFile(file);
      setImage(uri);
    }
  };

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor="thumbnailFile">Thumbnail File:</Label>
      <Input
        type="file"
        name="thumbnailFile"
        id="thumbnailFile"
        required
        onChange={handleFileChange}
      />
    </div>
  );
};

export default ImageSelect;
