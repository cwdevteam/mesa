"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ReloadIcon, FilePlusIcon, FileMinusIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";

interface User {
  id: string;
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
  website: string | null;
}

const ProfilePage = () => {
  const { push } = useRouter();
  const { address, isConnected } = useAccount();
  const [avatarUrl, setAvatarUrl] = useState<string | null>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<User | null>(null); // Initialize with null
  const [initialUserData, setInitialUserData] = useState<User | null>(null);
  const [fileToUpload, setFileToUpload] = useState<File | null>(null); // Track the file to upload

  useEffect(() => {
    if (!isConnected) {
      push("/");
    } else {
      fetchUserData();
    }
  }, [isConnected]);

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch user data: ${response.statusText}`);
      }

      const data = await response.json();
      setUserData(data.user);
      setInitialUserData(data.user);
      setAvatarUrl(data.user.avatar_url);
    } catch (error) {
      console.error(error);
    }
  };

  const onCancel = () => {
    setEditable(false);
    setUserData(initialUserData ? { ...initialUserData } : null); // Restore initial user data
    setAvatarUrl(initialUserData?.avatar_url || null); // Restore initial avatar URL
    setFileToUpload(null); // Clear file to upload on cancel
  };

  const onSave = async () => {
    setLoading(true);
    try {
      let avatarUrlToUpdate = avatarUrl; // Use the locally set avatarUrl
      if (fileToUpload) {
        setUploadLoading(true);
        const formData = new FormData();
        formData.append('file', fileToUpload);

        const response = await fetch('/api/upload/avatar', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          throw new Error(`Failed to upload file: ${response.statusText}`);
        }

        const data = await response.json();
        avatarUrlToUpdate = data.url; // Update avatarUrl with the uploaded image URL
        setUploadLoading(false);
      }

      // Update user data with the latest changes
      const updatedUserData = { ...userData!, avatar_url: avatarUrlToUpdate };
      if (userData?.username !== initialUserData?.username) {
        updatedUserData.username = userData?.username;
      }
      if (userData?.full_name !== initialUserData?.full_name) {
        updatedUserData.full_name = userData?.full_name;
      }
      if (userData?.website !== initialUserData?.website) {
        updatedUserData.website = userData?.website;
      }

      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: updatedUserData })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('User saved:', data);
      setInitialUserData({ ...userData } as any); // Update initial user data after save
      setEditable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setUploadLoading(false)
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileToUpload(file); // Store the selected file
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string); // Set avatarUrl to the preview of the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = async () => {
    setRemoveLoading(true);
    try {
      const response = await fetch('/api/remove/avatar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: userData?.id })
      });

      if (!response.ok) {
        throw new Error(`Failed to remove avatar: ${response.statusText}`);
      }

      setAvatarUrl(null); // Clear avatarUrl locally
      setUserData(userData ? { ...userData, avatar_url: null } : null); // Update user data
    } catch (error) {
      console.error(error);
    } finally {
      setRemoveLoading(false);
    }
  };

  return (
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[700px] mx-auto">
        <div className="text-2xl font-bold tracking-tight">User Profile</div>

        <div className="flex items-center justify-start gap-5 py-5 w">
          <Avatar className="h-28 w-28">
            <AvatarImage src={avatarUrl || ''} alt="avatar" />
            <AvatarFallback>
              {userData?.username ? userData.username.charAt(0).toUpperCase() : ''}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-2 flex-1">
            <h4 className="text-lg font-semibold">Upload your photo...</h4>
            <p className="text-sm font-light">
              Photo should be at least 300px X 300px
            </p>
            <div className="flex gap-5">
              {uploadLoading ? (
                <Button className="flex gap-2">
                  <ReloadIcon className="animate-spin" />
                  Uploading...
                </Button>
              ) : (
                <Button
                  className="flex items-center gap-2"
                  onClick={() => document.getElementById("fileUpload")?.click()}
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
                accept=".png, .jpg"
                onChange={handleFileChange}
              />

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
                  onClick={handleRemoveAvatar}
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
                    value={userData?.username || ""}
                    onChange={(e) => setUserData({ ...userData!, username: e.target.value })}
                  />
                </>
              ) : (
                <div className="flex items-center gap-5">
                  <p>Username: </p>
                  <p>{userData?.username}</p>
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
                      value={userData?.full_name || ""}
                      onChange={(e) => setUserData({ ...userData!, full_name: e.target.value })}
                    />
                  </>
                ) : (
                  <div className="flex items-center gap-5">
                    <p>Full Name: </p>
                    <p>{userData?.full_name}</p>
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
                      value={userData?.website || ""}
                      onChange={(e) => setUserData({ ...userData!, website: e.target.value })}
                    />
                  </>
                ) : (
                  <div className="flex items-center gap-5">
                    <p>Website: </p>
                    <p>{userData?.website}</p>
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
