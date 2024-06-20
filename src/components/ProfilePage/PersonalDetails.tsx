import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon } from "@radix-ui/react-icons";

interface PersonalDetailsProps {
  user: any;
  editable: boolean;
  loading: boolean;
  onCancel: () => void;
  onSave: () => void;
  setEditable: (editable: boolean) => void;
}

const PersonalDetails = ({
  user,
  editable,
  loading,
  onCancel,
  onSave,
  setEditable,
}: PersonalDetailsProps) => {
  const [username, setUsername] = useState<string>(user?.username || "");
  const [firstName, setFirstName] = useState<string>(user?.firstName || "");
  const [lastName, setLastName] = useState<string>(user?.lastName || "");
  const [nickName, setNickName] = useState<string>(user?.nickName || "");

  return (
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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
            {editable ? (
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
                <p>{`${user?.firstName} ${user?.lastName}`}</p>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <div className="flex-1">
            {editable ? (
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
                <p>{user?.nickName}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetails;
