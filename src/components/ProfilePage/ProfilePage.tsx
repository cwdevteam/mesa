"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { useUser } from "@/context/UserProvider";
import ProfileAvatar from "./ProfileAvatar";
import ProfileDetails from "./ProfileDetails";
import { UserDetailsProps } from "@/types/const";
import updateUser from "@/lib/supabase/user/updateUser";
import { Address } from "viem";

const ProfilePage = () => {
  const { push } = useRouter();
  const { address } = useAccount();
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  const [editable, setEditable] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { user: initialUser, fetchUser } = useUser();

  const onSave = async () => {
    setLoading(true);
    try {
      const updatedUserData: UserDetailsProps = {
        ...user!,
        addresses: [address as Address],
      };

      await updateUser(updatedUserData);

      setEditable(false);
      push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onCancel = () => {
    setEditable(false);
    setUser(initialUser);
  };

  const handleInputChange = (field: keyof UserDetailsProps, value: string) => {
    setUser((prevUser) => ({
      ...prevUser!,
      [field]: value,
    }));
  };

  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    if (!user) {
      fetchUser();
    }
  }, []);

  return (
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[700px] mx-auto">
        <div className="text-2xl font-bold tracking-tight">User Profile</div>
        <ProfileAvatar editable={editable} />
        <ProfileDetails
          editable={editable}
          handleInputChange={handleInputChange}
          loading={loading}
          onCancel={onCancel}
          onSave={onSave}
          setEditable={setEditable}
          user={user}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
