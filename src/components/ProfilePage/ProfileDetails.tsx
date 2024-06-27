"use client";

import { FC, useState } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import ProfileDetailsMain from "./ProfileDetailsMain";
import { useProfileProvider } from "@/context/ProfileProvider";
import { useUser } from "@/context/UserProvider";
import { UserDetailsProps } from "@/types/const";
import { useAccount } from "wagmi";
import updateUser from "@/lib/supabase/user/updateUser";
import { useRouter } from "next/navigation";
import { Address } from "viem";

const ProfileDetails: FC = () => {
  const { user, editing, setUser, setEditing } = useProfileProvider();
  const { user: initialUser } = useUser();
  const [loading, setLoading] = useState<boolean>(false);
  const { address } = useAccount();
  const { push } = useRouter();

  const onCancel = () => {
    setEditing(false);
    setUser(initialUser);
  };

  const onSave = async () => {
    setLoading(true);
    try {
      const updatedUserData: UserDetailsProps = {
        ...user!,
        addresses: [address as Address],
      };
      await updateUser(updatedUserData);
      await push("/dashboard");
      setEditing(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md">
      <div className="bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between gap-2 p-5 rounded-t-md">
        <h5 className="text-lg font-medium">Personal details</h5>
        {!editing ? (
          <Button onClick={() => setEditing(true)}>Edit</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            {loading ? (
              <Button className="flex gap-2">
                <ReloadIcon className="animate-spin" />
                Saving...
              </Button>
            ) : (
              <Button onClick={onSave}>Save</Button>
            )}
          </div>
        )}
      </div>
      <ProfileDetailsMain />
    </div>
  );
};

export default ProfileDetails;
