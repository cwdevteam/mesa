import React, { FC, useState } from "react";
import { Input } from "../ui/input";
import { useProfileProvider } from "@/context/ProfileProvider";

const PersonalDetailsForm: FC = () => {
  const { user, editing } = useProfileProvider();

  const [username, setUsername] = useState<string>(user?.username || "");
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [nickName, setNickName] = useState<string>(user?.nickName || "");

  return (
    <div className="p-5 flex flex-col gap-3">
      <div>
        {editing ? (
          <>
            <label htmlFor="user_name" className="text-sm">
              Username
            </label>
            <Input
              id="user_name"
              name="name"
              value={username}
              onChange={(e) => setUsername(e?.target?.value)}
            />
          </>
        ) : (
          <div className="flex items-center gap-5">
            <p>Username: </p>
            <p>{user?.username}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-5">
        <div className="flex-1">
          {editing ? (
            <>
              <label htmlFor="user_first" className="text-sm">
                Legal Name
              </label>
              <div className="flex items-center gap-5">
                <Input
                  id="user_first"
                  name="first_name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                  id="user_last"
                  name="last_name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <p>Legal Name: </p>
              <p>{`${user?.firstName} ${user?.lastName}`}</p>{" "}
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="flex-1">
          {editing ? (
            <>
              <label htmlFor="nick_name" className="text-sm">
                Artist Nick name
              </label>
              <div className="flex items-center gap-5">
                <Input
                  id="nick_name"
                  name="nick_name"
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
            </>
          ) : (
            <div className="flex items-center gap-5">
              <p>Artist Nick name: </p>
              <p>{user?.nickName}</p>{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;
