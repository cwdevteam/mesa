"use client";

import { uploadFile } from "@/lib/ipfs/uploadToIpfs";
import { Button } from "../ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";
import usePaymasterAttest from "@/hooks/usePaymasterAttest";
import { useProjectProvider } from "@/context/ProjectProvider";
import { useState } from "react";

const UploadButton = () => {
  const { setAnimationUrl } = useProjectProvider();
  const { attest } = usePaymasterAttest();
  const [fileSelected, setFileSelected] = useState(false);

  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const { uri } = await uploadFile(file);
      setAnimationUrl(uri);
      setFileSelected(true);
    }
  };

  return (
    <div>
      <Button
        size={fileSelected ? "default" : "icon"}
        className={`${!fileSelected && "rounded-full"}`}
        onClick={() =>
          fileSelected
            ? attest()
            : document.getElementById("fileUpload")?.click()
        }
      >
        {fileSelected ? "Save" : <FilePlusIcon className="h-4 w-4" />}
      </Button>
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        accept=".mp3, .wav, .aif, .aiff"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default UploadButton;
