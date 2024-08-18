import { useProjectProvider } from "@/context/ProjectProvider";
import { useUserProvider } from "@/context/UserProvider";
import { ContractType, UserRole } from "@/types/projectMetadataForm";
import { useEffect } from "react";
import { useAccount } from "wagmi";

const useDefaultCredit = () => {
  const { address } = useAccount();
  const { user } = useUserProvider();
  const { setCredits } = useProjectProvider();

  useEffect(() => {
    if (!(user.full_name && address)) return;
    setCredits([
      {
        contractType: ContractType.Songwriting,
        collaboratorType: UserRole.Owner,
        name: user.full_name,
        splitBps: 10000,
        address,
      },
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, address]);
};

export default useDefaultCredit;
