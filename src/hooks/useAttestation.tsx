import { ProjectIDType, UserDetailsProps } from "@/types/const";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchAttestation } from "@/lib/eas/fetchAttestation";
import { useParams } from "next/navigation";
import useProjects from "@/hooks/useProjects";

const useAttestation = () => {
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();
  const { projects } = useProjects();

  const [dashboardData, setDashboardData] = useState<UserDetailsProps | null>(
    null
  );

  const fetchData = useCallback(async () => {
    if (projects.length > 0 && address) {
      let { dashboardData }: any = await fetchAttestation(
        projects,
        address,
        id
      );
      setDashboardData(dashboardData);
    }
  }, [projects, address]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects, address]);

  return { dashboardData };
};

export default useAttestation;
