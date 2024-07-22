import React from "react";

import { ProjectTab } from "@/types/const";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

const ProjectTabs = ({
  tabContent,
  onTabChange,
}: {
  tabContent: ProjectTab;
  onTabChange: (tab: ProjectTab) => void;
}) => (
  <Tabs defaultValue="project" value={tabContent}>
    <TabsList>
      <TabsTrigger value="project" onClick={() => onTabChange("project")}>
        Project
      </TabsTrigger>
      <TabsTrigger value="contract" onClick={() => onTabChange("contract")}>
        Contract
      </TabsTrigger>
      <TabsTrigger value="setting" onClick={() => onTabChange("setting")}>
        Setting
      </TabsTrigger>
      <TabsTrigger value="zora" onClick={() => onTabChange("zora")}>
        Zora
      </TabsTrigger>
    </TabsList>
  </Tabs>
);

export default ProjectTabs;
