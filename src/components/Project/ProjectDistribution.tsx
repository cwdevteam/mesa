"use client";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ProjectDistribution = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [projectData, setProjectData] = useState<{
    id: string;
    name: string;
    desc: string;
  }>({ id: "", name: "", desc: "" });

  return (
    <main className="container py-10 mx-auto max-w-5xl">
      <div className="flex flex-col justify-center gap-5 max-w-[300px] -mt-9">
        <div>
          <label htmlFor="project_name" className="text-sm font-medium">
            Project Name
          </label>
          <Input
            id="project_name"
            name="name"
            onChange={(e) =>
              setProjectData({
                ...projectData,
                [e.target.name]: e.target.value,
              })
            }
            value={projectData.name}
          />
        </div>
        <div>
          <label htmlFor="project_desc" className="text-sm font-medium">
            Project Description
          </label>
          <Textarea
            id="project_desc"
            name="desc"
            onChange={(e) =>
              setProjectData({
                ...projectData,
                [e.target.name]: e.target.value,
              })
            }
            value={projectData.desc}
          />
        </div>
        {loading ? (
          <Button
            size="icon"
            className="w-full flex justify-center items-center"
          >
            <ReloadIcon
              color="currentColor"
              className="h-4 w-4 animate-spin mr-2"
            />
            Updating...
          </Button>
        ) : (
          <Button className="w-full">Update</Button>
        )}
      </div>
      <div className="flex flex-col justify-center gap-5 py-10">
        <div className="text-2xl font-bold tracking-tight">Danger Zone</div>
        <div className="border border-red-400 flex flex-col justify-center rounded-lg">
          <div className="flex items-center justify-between p-5 flex-wrap">
            <div>
              <h6 className="text-sm font-semibold">Delete this project</h6>
              <p className="text-sm">
                Once you delete a project, there is no going back, Please be
                certain.
              </p>
            </div>
            {loading ? (
              <Button
                size="icon"
                className="w-auto px-5 cursor-default flex justify-center items-center"
                variant={"default"}
              >
                <ReloadIcon
                  color="currentColor"
                  className="h-4 w-4 animate-spin mr-2"
                />
                Deleting...
              </Button>
            ) : (
              <Button
                className="text-red-500 hover:bg-red-500 hover:text-white"
                variant={"default"}
              >
                Delete this project
              </Button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default ProjectDistribution;
