"use client";

import {useCallback, useEffect, useState} from "react";
import ProjectTabs from "../ProjectTabs";
import { ProjectTab } from "@/types/const";
import ProjectDetailsComponent from "../ProjectMetaDataTable/ProjectDetailsComponent";
import ContractDetailsPage from "../ProjectContract/ContractDetailsPage";
import ProjectDistribution from "./ProjectDistribution";
import MockData from "./project.json";
import {useAccount} from "wagmi";
import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import {useProjectProvider} from "@/context/ProjectProvider";
import {useParams} from "next/navigation";

type Params = {
  id: string;
}

const ProjectPage = () => {
  const [tabContent, setTabContent] = useState<ProjectTab>("project");
  const [mockData, setMockData] = useState(null);
  const { address } = useAccount();
  const { setName, setDescription } = useProjectProvider();
  const { id } = useParams<Params>();

  const fetchAttestation = useCallback(async () => {
    const response = await fetch(`/api/attestation?address=${address}&uid=${id}`);
    if (!response.ok) return false;
    const data = await response.json();
    const mapped = data.data.map((attestation: any) =>
        getDecodedAttestationData(attestation.result)
    );
    const extractedData:any = {};
    mapped.forEach((subArray:any) => {
      subArray.forEach((item:any) => {
        const key = item.name === "metadataUri" ? "description" : item.name;
        extractedData[key] = item?.value?.value;
      });
    });
    let dashboardData:any = MockData
    dashboardData['name'] = extractedData['title'];
    dashboardData['description'] = extractedData['description'];
    setMockData(dashboardData)
    setName(extractedData['title'])
    setDescription( extractedData['description'])
    return extractedData
  }, []);

  useEffect(() => {
    fetchAttestation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
