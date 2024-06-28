"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { FilePlusIcon, ReloadIcon } from "@radix-ui/react-icons";

const UploadButton = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFile: File | null = e.target.files ? e.target.files[0] : null;

    if (newFile) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", newFile);
      formData.append("projectId", projectId);
    }
    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Button size="icon" className="rounded-full">
          <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          size="icon"
          className="rounded-full"
          onClick={() => document.getElementById("fileUpload")?.click()}
        >
          <FilePlusIcon className="h-4 w-4" />
        </Button>
      )}
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".mp3, .wav, .aif, .aiff"
      />
    </div>
  );
};

export default UploadButton;
