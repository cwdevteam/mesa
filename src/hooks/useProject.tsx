import { Credit, defaultCredit } from "@/types/projectMetadataForm";
import { useEffect, useState } from "react";
import useAttestation from "./useAttestation";
import useProjectMedia from "./useProjectMedia";
import { useUserProvider } from "@/context/UserProvider";

const useProject = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [animationUrl, setAnimationUrl] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [ethPrice, setEthPrice] = useState<string>("");
  const { dashboardData }: any = useAttestation();
  useProjectMedia(animationUrl, image, name);
  const [credits, setCredits] = useState<Credit[] | null>(null);
  const { user } = useUserProvider();

  useEffect(() => {
    if (user && !credits) setCredits([{...defaultCredit, name: user.username }]);
  }, [user, credits])

  const fetchData = async () => {
    if (dashboardData) {
      setName(dashboardData["name"]);
      setDescription(dashboardData["description"]);
      setCredits(dashboardData["credits"] || [defaultCredit]);
      setAnimationUrl(dashboardData["animationUrl"] || "");
      setImage(dashboardData["image"] || "");
    }
  };

  useEffect(() => {
    dashboardData && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dashboardData]);

  return {
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
