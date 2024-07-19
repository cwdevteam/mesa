import { UserDetailsProps } from "@/types/const";
import { useCallback, useEffect, useState } from "react";
import { fetchAttestation } from "@/lib/eas/fetchAttestation";
import useAttestationRead from "@/hooks/useAttestationRead";

const useAttestation = () => {
  const { attestationData }: any = useAttestationRead();
  const [dashboardData, setDashboardData] = useState<UserDetailsProps | null>(
    null
  );

  const fetchData = useCallback(async () => {
    if (attestationData.data.length > 0) {
      let { dashboardData }: any = await fetchAttestation(attestationData.data);
      setDashboardData(dashboardData);
    }
  }, [attestationData]);

  useEffect(() => {
    if (!attestationData?.data) return;
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attestationData]);

  return { dashboardData };
};

export default useAttestation;
