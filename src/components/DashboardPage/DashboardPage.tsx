"use client";

import { ProjectDataTable } from "@/components/ProjectDataTable";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const DashboardPage = ({ lang, dict, projects }: any) => {
  const { isConnected } = useAccount();
  const { push } = useRouter();

  useEffect(() => {
    if (!isConnected) {
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <main className="grid gap-10 container mx-auto py-10 content-start">
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your Projects</h2>
        <Button>Create Project</Button>
      </div>
      <ProjectDataTable data={projects} />
    </main>
  );
};

export default DashboardPage;
