"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon, FilePlusIcon, FileMinusIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { TUser } from "../LoginButton/LoginButton";
import { useUser } from "@/context/UserProvider";
import { useAccount } from "wagmi";

interface ProfileAvatarProps {
  editable: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ editable }) => {
  const { address } = useAccount();
  const { user, updateUser } = useUser();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(user?.avatar_url || null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        if (reader.result) {
          setAvatarUrl(reader.result as string);
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const uploadAvatar = async () => {
    setUploadLoading(true);
    try {
      const response = await fetch("/api/avatar", {
        method: "POST",
        body: JSON.stringify({ avatar_url: avatarUrl, userId: address }),
      });

      if (!response.ok) {
        throw new Error(`Failed to upload file: ${response.statusText}`);
      }

      const data = await response.json();
      setAvatarUrl(data.url);

      const updatedUserData: TUser = {
        ...user!,
        userId: address,
        avatar_url: data.url,
      };

      await updateUser(updatedUserData);

      console.log("Avatar uploaded:", updatedUserData);
    } catch (error) {
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleRemoveAvatar = async () => {
    setRemoveLoading(true);
    try {
      const response = await fetch("/api/avatar", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: address }),
      });

      if (!response.ok) {
        throw new Error(`Failed to remove avatar: ${response.statusText}`);
      }

      updateUser({ ...user!, avatar_url: null });

      console.log("Avatar removed");
    } catch (error) {
      console.error(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-start gap-5 py-5 w">
      <Avatar className="h-28 w-28">
        <AvatarImage src={user?.avatar_url || ""} alt="avatar" />
        <AvatarFallback>
          {user?.username ? user.username.charAt(0).toUpperCase() : ""}
        </AvatarFallback>
      </Avatar>

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
              disabled={editable || removeLoading}
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

          {removeLoading ? (
            <Button
              className="flex gap-2 text-red-500 border-red-500 hover:text-red-500"
              variant={"outline"}
            >
              <ReloadIcon className="animate-spin" />
              Removing...
            </Button>
          ) : (
            <Button
              className="text-red-500 border-red-500 hover:text-red-500 flex items-center gap-2"
              variant={"outline"}
              disabled={editable || uploadLoading}
              onClick={handleRemoveAvatar}
            >
              <FileMinusIcon width={16} height={16} />
              Remove Photo
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileAvatar;
