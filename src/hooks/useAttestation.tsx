import { ProjectIDType, UserDetailsProps } from "@/types/const";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { fetchAttestation } from "@/lib/eas/fetchAttestation";
import { useParams } from "next/navigation";

const useAttestation = () => {
  const { address } = useAccount();
  const { id } = useParams<ProjectIDType>();
  const [dashboardData, setDashboardData] = useState<UserDetailsProps | null>(
    null
  );

  const fetchData = useCallback(async () => {
    let { dashboardData }: any = await fetchAttestation(address, id);
    setDashboardData(dashboardData);
  }, [address]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { dashboardData };
};

export default useAttestation;
