"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { useProfileProvider } from "@/context/ProfileProvider";
import EditingButtons from "./EditingButtons";
import ProfileDetailsForm from "./ProfileDetailsForm";

const ProfileDetails: FC = () => {
  const { editing, setEditing } = useProfileProvider();

  return (
    <div className="flex flex-col gap-2 border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md">
      <div className="bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between gap-2 p-5 rounded-t-md">
        <h5 className="text-lg font-medium">Personal details</h5>
        {!editing && <Button onClick={() => setEditing(true)}>Edit</Button>}
        {editing && <EditingButtons />}
      </div>
      <ProfileDetailsForm />
    </div>
  );
};

export default ProfileDetails;
