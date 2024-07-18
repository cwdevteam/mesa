import { UserDetailsProps } from "@/types/const";
import { useCallback, useEffect, useState } from "react";
import { fetchAttestation } from "@/lib/eas/fetchAttestation";
import useAttestationRead from "@/hooks/useAttestationRead";

const useAttestation = () => {
  const attestationData: any = useAttestationRead();
  const [dashboardData, setDashboardData] = useState<UserDetailsProps | null>(
    null
  );

  const fetchData = useCallback(async () => {
    let data = attestationData.data;
    if (data) {
      let { dashboardData }: any = await fetchAttestation(data);
      setDashboardData(dashboardData);
    }
  }, [attestationData]);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attestationData]);

  return { dashboardData };
};

export default useAttestation;
