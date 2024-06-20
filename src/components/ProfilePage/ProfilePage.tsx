"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ReloadIcon, FilePlusIcon, FileMinusIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PersonalDetails from "./PersonalDetails";
import { useRouter } from "next/navigation";

const ProfilePage = ({ user }: { user?: any }) => {
  const [avatarUrl, setAvatarUrl] = useState<string>(user?.avatarUrl || "");
  const [loading, setLoading] = useState<boolean>(false);
  const [editable, setEditable] = useState<boolean>(false);
  const [uploadLoading, setUploadLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);
  const { push } = useRouter();

  const onCancel = () => {
    setEditable(false);
  };

  const onSave = () => {
    setLoading(true);
    setLoading(false);
    setEditable(false);
    push("/dashboard");
  };

  return (
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[700px] mx-auto">
        <div className="text-2xl font-bold tracking-tight">User Profile</div>
        <div className="flex items-center justify-start gap-5 py-5 w">
          <Avatar className="h-28 w-28">
            <AvatarImage src={avatarUrl} alt="avatar" />
            <AvatarFallback>AA</AvatarFallback>
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
                >
                  <FileMinusIcon width={16} height={16} />
                  Remove Photo
                </Button>
              )}
            </div>
          </div>
        </div>

        <PersonalDetails
          user={user}
          editable={editable}
          loading={loading}
          onCancel={onCancel}
          onSave={onSave}
          setEditable={setEditable}
        />
      </div>
    </main>
  );
};

export default ProfilePage;
