"use client";

import { ProjectDataTable } from "@/components/ProjectDataTable";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NewProjectButton from "../NewProjectButton";
import useProjects from "@/hooks/useProjects";
import { useToast } from "../ui/use-toast";

const DashboardPage =  ({email} : {email?: string} ) => {
  const { isConnected } = useAccount();
  const { push } = useRouter();
  const { projects } = useProjects();
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    if (isConnected && !email ) {
      toast({
        description: "Email is missing.",
      })
      push("/profile")
    }else {
      setIsLoading(false);
    }
  }, [email])

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  if(isLoading) {
    return <p className="mx-auto mt-8" >Loading...</p>
  }

  return (
    <main className="grid gap-10 container mx-auto py-10 content-start">
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your Projects</h2>
        <NewProjectButton />
      </div>
      <ProjectDataTable data={projects} />
    </main>
  );
};

export default DashboardPage;
