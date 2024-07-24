import { Credit, defaultCredit } from "@/types/projectMetadataForm";
import { useEffect, useState } from "react";
import useAttestation from "./useAttestation";

const useProject = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [animationUrl, setAnimationUrl] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [credits, setCredits] = useState<Credit[]>([defaultCredit]);
  const { dashboardData }: any = useAttestation();

  const fetchData = async () => {
    if (dashboardData) {
      setName(dashboardData["name"]);
      setDescription(dashboardData["description"]);
      setCredits(dashboardData["credits"] || [defaultCredit]);
    }
  };

  useEffect(() => {
    dashboardData && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData]);

  return {
    audioFile,
    setAudioFile,
    credits,
    setCredits,
    name,
    setName,
    description,
    setDescription,
    animationUrl,
    setAnimationUrl,
  };
};

export default useProject;
