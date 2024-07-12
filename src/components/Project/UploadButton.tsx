"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { FilePlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
// import { useRouter } from "next/router";

const UploadButton = ({ projectId }: { projectId: string }) => {
  // const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const newFile: File | null = e.target.files ? e.target.files[0] : null;

      if (newFile) {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", newFile);
        formData.append("projectId", projectId);

        const response = await fetch("/api/upload/", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (data && data.status) {
          // router.reload();
          toast({
            title: "Success",
            description: "Successfully Uploaded",
          });
        }
        setLoading(false);
      }
    } catch (err: any) {
      setLoading(false);
      if (err.response?.data) {
        toast({
          title: "Error",
          description: err.response.data,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Something went wrong!",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div>
      {loading ? (
        <Button size="icon" className="rounded-full">
          <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
        </Button>
      ) : (
        <Button
          size="icon"
          className="rounded-full"
          onClick={() => document.getElementById("fileUpload")?.click()}
        >
          <FilePlusIcon className="h-4 w-4" />
        </Button>
      )}
      <input
        type="file"
        id="fileUpload"
        style={{ display: "none" }}
        onChange={handleFileChange}
        accept=".mp3, .wav, .aif, .aiff"
      />

      {/*<Button*/}
      {/*  size="icon"*/}
      {/*  className="rounded-full"*/}
      {/*  onClick={() => document.getElementById("fileUpload")?.click()}*/}
      {/*>*/}
      {/*  <FilePlusIcon className="h-4 w-4" />*/}
      {/*</Button>*/}
      {/*<input*/}
      {/*  type="file"*/}
      {/*  id="fileUpload"*/}
      {/*  style={{ display: "none" }}*/}
      {/*  accept=".mp3, .wav, .aif, .aiff"*/}
      {/*/>*/}
    </div>
  );
};

export default UploadButton;
