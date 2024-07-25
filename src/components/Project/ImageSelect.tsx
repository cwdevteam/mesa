"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectProvider } from "@/context/ProjectProvider";
import { uploadFile } from "@/lib/ipfs/uploadToIpfs";
import { useState } from "react";
import AttestButton from "./AttestButton";

const ImageSelect = () => {
  const { setImage } = useProjectProvider();
  const [fileSelected, setFileSelected] = useState<boolean>(false);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    if (file) {
      const { uri } = await uploadFile(file);
      setImage(uri);
      setFileSelected(true);
    }
  };

  return (
    <div>
      {fileSelected ? (
        <AttestButton />
      ) : (
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
      )}
    </div>
  );
};

export default ImageSelect;
