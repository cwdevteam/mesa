"use client";
import { ProjectDataTable } from "@/components/ProjectDataTable";
import NewProjectButton from "../NewProjectButton";
import useProjects from "@/hooks/useProjects";

const DashboardPage = ({ email }: { email?: string }) => {
  const { projects } = useProjects();

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
