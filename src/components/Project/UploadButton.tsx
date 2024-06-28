"use client";
import { Button } from "../ui/button";
import { FilePlusIcon } from "@radix-ui/react-icons";

const UploadButton = ({ projectId }: { projectId: string }) => {
  return (
    <div>
      <Button
        size="icon"
        className="rounded-full"
        onClick={() => document.getElementById("fileUpload")?.click()}
      >
        <FilePlusIcon className="h-4 w-4" />
      </Button>
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
