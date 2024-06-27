"use client";

import { FC } from "react";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import ProfileDetailsMain from "./ProfileDetailsMain";

const ProfileDetails: FC<any> = ({
  onSave,
  loading,
  onCancel,
  editable,
  setEditable,
  handleInputChange,
}) => (
  <div className="flex flex-col gap-2 border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md">
    <div className="bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between gap-2 p-5 rounded-t-md">
      <h5 className="text-lg font-medium">Personal details</h5>
      {!editable ? (
        <Button onClick={() => setEditable(true)}>Edit</Button>
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
    <ProfileDetailsMain
      editable={editable}
      handleInputChange={handleInputChange}
    />
  </div>
);

export default ProfileDetails;
