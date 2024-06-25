"use client";
import { ProjectDataTable } from "@/components/ProjectDataTable";
import NewProjectButton from "../NewProjectButton";
import useProjects from "@/hooks/useProjects";
import { useToast } from "../ui/use-toast";
import { useUser } from "@/context/UserProvider";
import { useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardPage = () => {
  const { isConnected } = useAccount();
  const { push } = useRouter();
  const { projects } = useProjects();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useUser();

  useEffect(() => {
    if (isConnected && !user?.username) {
      toast({
        description: "Username is missing.",
      });
      push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [user?.username]);

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  if (isLoading) {
    return <p className="mx-auto mt-8">Loading...</p>;
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
