"use client";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUser } from "@/context/UserProvider";
import { useAccount } from "wagmi";
import { UserDetailsProps } from "@/types/const";
import ProfileAvatarButtons from "./ProfileAvatarButtons";

const ProfileAvatar: React.FC<{
  editable: boolean;
}> = ({ editable }) => {
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

      <ProfileAvatarButtons
        avatarUrl={avatarUrl}
        editable={editable}
        handleFileChange={handleFileChange}
        handleRemoveAvatar={handleRemoveAvatar}
        removeLoading={removeLoading}
        uploadAvatar={uploadAvatar}
        uploadLoading={uploadLoading}
      />
    </div>
  );
};

export default ProfileAvatar;
