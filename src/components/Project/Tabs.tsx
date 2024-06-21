"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ProjectDetailsCard from "@/components/ProjectDetailsCard";
import Chat from "@/components/Project/Chat";
import UploadButton from "@/components/Project/UploadButton";
import ProjectDistribution from "./ProjectDistribution";
import { Button } from "../ui/button";
import { ProjectTabsProps } from "./types";
import ContractHistoryTable from "./ContractHistoryTable";
import CardComponent from "../ProjectCollaborators/CardComponent";

const ProjectTabs = ({
  project,
  contractId,
  contractHistories,
  contractTime,
}: ProjectTabsProps) => {
  const [tabContent, setTabContent] = useState("project");

  const onTabChange = (tab: string) => {
    setTabContent(tab);
  };

  const downloadContractDoc = () => {};

  return (
    <div className="mb-10 w-full">
      <Tabs defaultValue="project" value={tabContent}>
        <TabsList>
          <TabsTrigger value="project" onClick={() => onTabChange("project")}>
            Project
          </TabsTrigger>
          <TabsTrigger value="contract" onClick={() => onTabChange("contract")}>
            Contract
          </TabsTrigger>
          <TabsTrigger
            value="distribution"
            onClick={() => onTabChange("distribution")}
          >
            Distribution
          </TabsTrigger>
        </TabsList>

        <TabsContent value="project">
          <div className="flex flex-col items-center lg:items-start gap-2 w-full">
            <ProjectDetailsCard project={project as any} />
            <div className="flex flex-col lg:flex-row-reverse gap-8 w-full">
              <div className="w-full">
                <CardComponent
                  allData={[{ user_id: "qwer", user_name: "ERTYUio" }]}
                  data={"dsaef"}
                  project={{
                    projectUsers: [
                      { user_id: "wertyuio", user_name: "User name" },
                    ],
                  }}
                />
                <UploadButton projectId={project.id} />
                {/* <div className="py-5">
                  <MediaList medias={medias} />
                </div> */}
              </div>
              <div className="w-full lg:max-w-[400px]">
                <Chat project={project} />
              </div>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="contract">
          <div className="w-full">
            <div className="text-center text-2xl font-bold w-full">
              {project?.title}
            </div>
            <div className="text-center">{project?.description}</div>
            {contractId ? (
              <div className="flex flex-col justify-center pt-10 items-center gap-4">
                <span>
                  Contract created at{" "}
                  <span className="font-bold">
                    {contractTime && new Date(contractTime).toLocaleString()}{" "}
                  </span>
                </span>
                <Button onClick={downloadContractDoc}>
                  Download Signed Document
                </Button>
                <div className="w-full flex justify-center max-w-3xl pt-6">
                  <ContractHistoryTable contractHistories={contractHistories} />
                </div>
              </div>
            ) : (
              <div className="text-center mt-5">
                Contract has not started yet
              </div>
            )}
          </div>
        </TabsContent>
        <TabsContent value="distribution">
          <ProjectDistribution />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProjectTabs;
