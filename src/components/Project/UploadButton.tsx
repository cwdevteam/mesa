"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { FilePlusIcon, ReloadIcon } from "@radix-ui/react-icons";

const UploadButton = ({ projectId }: { projectId: string }) => {
  const [loading, setLoading] = useState<boolean>(false);

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
        accept=".mp3, .wav, .aif, .aiff"
      />
    </div>
  );
};

export default UploadButton;
