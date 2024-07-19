"use client";

import { ReactNode, createContext, useContext, useMemo } from "react";
import useProjectInvite from "@/hooks/useProjectInvite";

const ProjectInviteContext = createContext({} as any);

const ProjectInviteProvider = ({ children }: { children: ReactNode }) => {
  const projectInvite = useProjectInvite();

  const value = useMemo(
    () => ({
      ...projectInvite,
    }),
    [projectInvite]
  );

  return (
    <ProjectInviteContext.Provider value={value}>
      {children}
    </ProjectInviteContext.Provider>
  );
};

export const useProjectInviteProvider = () => {
  const context = useContext(ProjectInviteContext);
  if (!context) {
    throw new Error(
      "useProjectInviteProvider must be used within a ProfileProvider"
    );
  }
  return context;
};

export default ProjectInviteProvider;
