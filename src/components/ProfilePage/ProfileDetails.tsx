"use client";
import { Dispatch, FC, SetStateAction } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";
import { TUser } from "../LoginButton/LoginButton";

interface ProfileDetailsProps {
  editable: boolean;
  loading: boolean;
  user: TUser | null;
  onSave: () => void;
  onCancel: () => void;
  setEditable: Dispatch<SetStateAction<boolean>>;
  handleInputChange: (field: keyof TUser, value: string) => void;
}

const ProfileDetails: FC<ProfileDetailsProps> = ({
  user,
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
    <div className="p-5 flex flex-col gap-3">
      <div>
        {editable ? (
          <>
            <label htmlFor="user_name" className="text-sm">
              Username
            </label>
            <Input
              id="user_name"
              name="name"
              value={user?.username || ""}
              onChange={(e) => handleInputChange("username", e.target.value)}
            />
          </>
        ) : (
          <div className="flex items-center gap-5">
            <p>Username: </p>
            <p>{user?.username || ""}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-5">
        <div className="flex-1">
          {editable ? (
            <>
              <label htmlFor="user_full_name" className="text-sm">
                Full Name
              </label>
              <Input
                id="user_full_name"
                name="full_name"
                value={user?.full_name || ""}
                onChange={(e) => handleInputChange("full_name", e.target.value)}
              />
            </>
          ) : (
            <div className="flex items-center gap-5">
              <p>Full Name: </p>
              <p>{user?.full_name || ""}</p>
            </div>
          )}
        </div>

        <div className="flex-1">
          {editable ? (
            <>
              <label htmlFor="user_website" className="text-sm">
                Website
              </label>
              <Input
                id="user_website"
                name="website"
                value={user?.website || ""}
                onChange={(e) => handleInputChange("website", e.target.value)}
              />
            </>
          ) : (
            <div className="flex items-center gap-5">
              <p>Website: </p>
              <p>{user?.website || ""}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default ProfileDetails;
