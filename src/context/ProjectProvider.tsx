"use client";

import useProject from "@/hooks/useProject";
import { ReactNode, createContext, useContext, useMemo } from "react";

const ProjectContext = createContext({} as any);

const ProjectProvider = ({ children }: { children: ReactNode }) => {
  const project = useProject();

  const value = useMemo(
    () => ({
      ...project,
    }),
    [project]
  );

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};

export const useProjectProvider = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error("useProjectProvider must be used within a ProjectProvider");
  }
  return context;
};

export default ProjectProvider;
