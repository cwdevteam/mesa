"use client";

import { useCallback, useEffect, useState } from "react";
import ProjectTabs from "../ProjectTabs";
import { ProjectIDType, ProjectTab } from "@/types/const";
import ProjectDetailsComponent from "../ProjectMetaDataTable/ProjectDetailsComponent";
import ContractDetailsPage from "../ProjectContract/ContractDetailsPage";
import ProjectDistribution from "./ProjectDistribution";
import MockData from "./project.json";
import { useAccount } from "wagmi";
import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import { useProjectProvider } from "@/context/ProjectProvider";
import { useParams } from "next/navigation";
import { usePaymasterProvider } from "@/context/Paymasters";
import { getProjects } from "@/lib/eas/getProjects";

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");
  const [mockData, setMockData] = useState(null);
  const { address } = useAccount();
  const { setName, setDescription } = useProjectProvider();
  const { id } = useParams<ProjectIDType>();
  const { error }: any = usePaymasterProvider();
  let refUid = "";
  let uid = id;
  let accountAddress = address;

  const fetchAttestation = useCallback(async () => {
    const queryParam = address ? `?address=${address}` : "";
    const projects: any = await getProjects(queryParam);
    debugger;
    if (projects?.data.length > 0) {
      let refAttestation = projects.data[projects.data.length - 1];
      refUid = refAttestation.result[5];
      if (refUid === id) {
        uid = refAttestation.result[0];
        accountAddress = refAttestation.result[7];
      }
    }
    const response = await fetch(
      `/api/attestation?address=${accountAddress}&uid=${uid}`
    );
    if (!response.ok) return false;
    const data = await response.json();
    const mapped = data.data.map((attestation: any) =>
      getDecodedAttestationData(attestation.result)
    );
    const extractedData: any = {};
    mapped.forEach((subArray: any) => {
      subArray.forEach((item: any) => {
        const key = item.name === "metadataUri" ? "description" : item.name;
        extractedData[key] = item?.value?.value;
      });
    });
    let dashboardData: any = MockData;
    dashboardData["name"] = extractedData["title"];
    dashboardData["description"] = extractedData["description"];
    setMockData(dashboardData);
    setName(dashboardData["name"]);
    setDescription(dashboardData["description"]);
    return extractedData;
  }, []);

  useEffect(() => {
    fetchAttestation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onTabChange = (tab: ProjectTab) => {
    setTabContent(tab);
  };

  return (
    <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
      <div className="mb-10 h-5">
        <ProjectTabs tabContent={tabContent} onTabChange={onTabChange} />
      </div>
      {tabContent === "project" && mockData && (
        <ProjectDetailsComponent project={mockData} />
      )}
      {tabContent === "contract" && (
        <ContractDetailsPage
          project={MockData}
          contractTime={null}
          contractId="contractTestId"
          contractHistories={MockData.contractHistories}
        />
      )}
      {tabContent === "setting" && <ProjectDistribution />}
    </main>
  );
};

export default ProjectPage;
