"use client";

import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ProfileAvatarButtons from "./ProfileAvatarButtons";
import getIpfsLink from "@/lib/ipfs/getIpfsLink";
import { useProfileProvider } from "@/context/ProfileProvider";

const ProfileAvatar: React.FC = () => {
  const { user } = useProfileProvider();
  const [avatarUrl, setAvatarUrl] = useState<string | ArrayBuffer | null>(
    user?.avatar_url || null
  );

  useEffect(() => {
    if (user?.avatar_url) {
      setAvatarUrl(getIpfsLink(user?.avatar_url));
    }
  }, [user?.avatar_url]);

  return (
    <div className="flex items-center justify-start gap-5 py-5">
      <Avatar className="h-28 w-28">
        <AvatarImage src={(avatarUrl as string) || ""} alt="avatar" />
        <AvatarFallback>
          {user?.username ? user.username.charAt(0).toUpperCase() : ""}
        </AvatarFallback>
      </Avatar>
      <ProfileAvatarButtons />
    </div>
  );
};

export default ProfileAvatar;
