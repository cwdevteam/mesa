import { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useProjectProvider } from "@/context/ProjectProvider";
import UpdateProjectButton from "./UpdateProjectButton";

const UpdateProjectSection = () => {
  const { name, setName, description, setDescription } = useProjectProvider();

  return (
    <div className="flex flex-col justify-center gap-5 max-w-[300px] -mt-9">
      <div>
        <label htmlFor="project_name" className="text-sm font-medium">
          Project Name
        </label>
        <Input
          id="project_name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div>
        <label htmlFor="project_desc" className="text-sm font-medium">
          Project Description
        </label>
        <Textarea
          id="project_desc"
          name="desc"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
        />
      </div>
      <UpdateProjectButton />
    </div>
  );
};

export default UpdateProjectSection;
