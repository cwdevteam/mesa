import React, { use, useState } from "react";
import { Button } from "../ui/button";
import { FilePlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { uploadFile } from "@/lib/ipfs/uploadToIpfs";
import { UserDetailsProps } from "@/types/const";
import updateUser from "@/lib/supabase/user/updateUser";
import { useUserProvider } from "@/context/UserProvider";
import { useAccount } from "wagmi";

const ProfileAvatarButtons = () => {
  const [uploading, setUploading] = useState<boolean>(false);
  const { user, fetchUser } = useUserProvider();
  const { address } = useAccount();

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploading(true);
      const { uri } = await uploadFile(file);
      const updatedUserData: UserDetailsProps = {
        ...user!,
        avatar_url: uri,
        addresses: [address],
      };
      await updateUser(updatedUserData);
      await fetchUser();
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 flex-1">
      <h4 className="text-lg font-semibold">Upload your photo...</h4>
      <p className="text-sm font-light">
        Photo should be at least 300px X 300px
      </p>
      <div className="flex gap-5">
        {uploading ? (
          <Button className="flex gap-2">
            <ReloadIcon className="animate-spin" />
            Uploading...
          </Button>
        ) : (
          <Button
            className="flex items-center gap-2"
            onClick={() => document.getElementById("fileUpload")?.click()}
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
      </div>
    </div>
  );
};

export default ProfileAvatarButtons;
