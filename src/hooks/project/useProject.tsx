import { Credit } from "@/types/projectMetadataForm";
import { useEffect, useState } from "react";
import useAttestation from "../useAttestation";
import useProjectMedia from "./useProjectMedia";

const useProject = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [animationUrl, setAnimationUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [ethPrice, setEthPrice] = useState<string>("");
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { attestationData, dashboardData }: any = useAttestation();
  useProjectMedia(animationUrl, image, name);

  const fetchData = async () => {
    setLoading(true);
    if (dashboardData) {
      setName(dashboardData["name"]);
      setDescription(dashboardData["description"]);
      setCredits(dashboardData["credits"]);
      setAnimationUrl(dashboardData["animationUrl"] || "");
      setImage(dashboardData["image"] || "");
    }
    setLoading(false);
  };

  useEffect(() => {
    dashboardData && loading && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData]);

  return {
    attestationData,
    credits,
    setCredits,
    name,
    setName,
    description,
    setDescription,
    animationUrl,
    setAnimationUrl,
    ethPrice,
    setEthPrice,
    image,
    setImage,
  };
};

export default useProject;
