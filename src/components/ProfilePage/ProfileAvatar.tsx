"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon, FilePlusIcon, FileMinusIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserProvider";
import { useAccount } from "wagmi";
import { UserDetailsProps } from "@/types/const";

interface ProfileAvatarProps {
  editable: boolean;
}

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ editable }) => {
  const { address } = useAccount();
  const { user, updateUser, deleteAvatar } = useUser();
  const [uploadLoading, setUploadLoading] = useState(false);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(
    user?.avatar_url || null
  );

  useEffect(() => {
    if (user?.avatar_url) {
      setAvatarUrl(user?.avatar_url);
    }
  }, [user?.avatar_url]);

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

  const uploadAvatar = () => {
    setUploadLoading(true);
    try {
      const updatedUserData: UserDetailsProps = {
        ...user!,
        userId: address as string,
        avatar_url: avatarUrl as string | null,
      };
      updateUser(updatedUserData);
    } catch (error) {
      console.error(error);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleRemoveAvatar = () => {
    setRemoveLoading(true);
    try {
      deleteAvatar(String(address));
    } catch (error) {
      console.error(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-start gap-5 py-5">
      <Avatar className="h-28 w-28">
        <AvatarImage src={(avatarUrl as string) || ""} alt="avatar" />
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
              disabled={!editable || uploadLoading}
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
