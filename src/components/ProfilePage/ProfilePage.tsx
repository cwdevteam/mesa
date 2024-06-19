"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon, FilePlusIcon, FileMinusIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

const ProfilePage = ({ user }: { user: any }) => {
  const { push } = useRouter();
  const { isConnected } = useAccount();
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  const onCancel = () => {
    setEditable(false)
  }

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[700px] mx-auto">
        <div className="text-2xl font-bold tracking-tight">User Profile</div>

        <div className="flex items-center justify-start gap-5 py-5 w">
          <Avatar className="h-28 w-28">
            <AvatarImage src={avatarUrl} alt="avatar" />
            <AvatarFallback>
              AA
              {/* {user.email ? user.email.slice(0, 2).toUpperCase() : 'ME'} */}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2 flex-1">
            <h4 className="text-lg font-semibold">Upload your photo...</h4>
            <p className="text-sm font-light">
              Photo should be at least 300px X 300px
            </p>
            <div className="flex gap-5">
              <>
                {uploadLoading ? (
                  <Button className="flex gap-2">
                    <ReloadIcon className="animate-spin" />
                    Uploading...
                  </Button>
                ) : (
                  <Button
                    className="flex items-center gap-2"
                    onClick={() =>
                      document.getElementById("fileUpload")?.click()
                    }
                    disabled={editable || removeLoading}
                  >
                    <FilePlusIcon width={16} height={16} />
                    Upload Photo
                  </Button>
                )}
                <input
                  type="file"
                  id="fileUpload"
                  style={{ display: "none" }}
                  // onChange={handleFileChange}
                  accept=".png, .jpg"
                />
              </>

              {removeLoading ? (
                <Button
                  className="flex gap-2 text-red-500 border-red-500 hover:text-red-500"
                  variant={"outline"}
                >
                  <ReloadIcon className="animate-spin" />
                  Removing...
                </Button>
              ) : (
                <Button
                  className="text-red-500 border-red-500 hover:text-red-500 flex items-center gap-2"
                  variant={"outline"}
                  disabled={editable || uploadLoading}
                  // onClick={handleRemoveAvatar}
                >
                  <FileMinusIcon width={16} height={16} />
                  Remove Photo
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md">
          <div className="bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between gap-2 p-5 rounded-t-md">
            <h5 className="text-lg font-medium">Personal details</h5>
            {!editable ? (
              <Button
                onClick={() => setEditable(true)}
                disabled={uploadLoading || removeLoading}
              >
                Edit
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  variant={"outline"}
                  onClick={onCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
                {loading ? (
                  <Button className="flex gap-2">
                    <ReloadIcon className="animate-spin" />
                    Saving...
                  </Button>
                ) : (
                  <Button onClick={() => null}>Save</Button>
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
                    // value={userData.username}
                    // onChange={(e) =>
                    // setUserData({ ...userData, username: e.target.value })
                    // }
                  />
                </>
              ) : (
                <div className="flex items-center gap-5">
                  <p>Username: </p>
                  {/* <p>{userData.username}</p> */}
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
                        // value={userData.firstName}
                        // onChange={(e) =>
                        //   setUserData({
                        //     ...userData,
                        //     firstName: e.target.value,
                        //   })
                        // }
                      />
                      <Input
                        id="user_last"
                        name="last_name"
                        // value={userData.lastName}
                        // onChange={(e) =>
                        //   setUserData({
                        //     ...userData,
                        //     lastName: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-5">
                    <p>Legal Name: </p>
                    <p>
                      {/* {userData.firstName} {userData.lastName} */}
                      Name surname
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center gap-5">
              <div className="flex-1">
                {editable ? (
                  <>
                    <label htmlFor="user_first" className="text-sm">
                      Artist Nick name
                    </label>
                    <div className="flex items-center gap-5">
                      <Input
                        id="user_first"
                        name="first_name"
                        // value={userData.nickName}
                        // onChange={(e) =>
                        //   setUserData({
                        //     ...userData,
                        //     nickName: e.target.value,
                        //   })
                        // }
                      />
                    </div>
                  </>
                ) : (
                  <div className="flex items-center gap-5">
                    <p>Artist Nick name: </p>
                    <p>
                      {/* {userData.nickName} */}
                      nick name
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
