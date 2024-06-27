import React from "react";
import { Input } from "../ui/input";
import { UserDetailsProps } from "@/types/const";

const ProfileDetailsMain = ({
  editable,
  handleInputChange,
  user,
}: {
  editable: boolean;
  user: UserDetailsProps | null;
  handleInputChange: (field: keyof UserDetailsProps, value: string) => void;
}) => {
  return (
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
  );
};

export default ProfileDetailsMain;
