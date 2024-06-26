import React from "react";
import { Button } from "../ui/button";
import { FileMinusIcon, FilePlusIcon, ReloadIcon } from "@radix-ui/react-icons";

const ProfileAvatarButtons = ({
  uploadLoading,
  removeLoading,
  editable,
  handleFileChange,
  handleRemoveAvatar,
  uploadAvatar,
  avatarUrl,
}: {
  uploadLoading: boolean;
  removeLoading: boolean;
  editable: boolean;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveAvatar: () => void;
  uploadAvatar: () => void;
  avatarUrl: string | null | ArrayBuffer;
}) => {
  return (
    <div className="flex flex-col gap-2 flex-1">
      <h4 className="text-lg font-semibold">Upload your photo...</h4>
      <p className="text-sm font-light">
        Photo should be at least 300px X 300px
      </p>
      <div className="flex gap-5">
        {uploadLoading ? (
          <Button className="flex gap-2">
            <ReloadIcon className="animate-spin" />
            Uploading...
          </Button>
        ) : (
          <Button
            className="flex items-center gap-2"
            onClick={() => document.getElementById("fileUpload")?.click()}
            disabled={!editable || removeLoading}
          >
            <FilePlusIcon width={16} height={16} />
            Upload Photo
          </Button>
        )}
        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          accept=".png, .jpg"
          onChange={handleFileChange}
        />

        <Button
          className="flex items-center gap-2"
          onClick={uploadAvatar}
          disabled={!avatarUrl || uploadLoading || removeLoading}
        >
          <FilePlusIcon width={16} height={16} />
          Save Photo
        </Button>

        <Button
          className="flex gap-2 items-center text-red-500 border-red-500 hover:text-red-500"
          variant={"outline"}
          onClick={removeLoading ? () => null : handleRemoveAvatar}
        >
          {removeLoading ? (
            <>
              <ReloadIcon className="animate-spin" />
              Removing... :
            </>
          ) : (
            <>
              <FileMinusIcon width={16} height={16} />
              Remove Photo
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfileAvatarButtons;
