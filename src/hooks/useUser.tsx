import { UserDetailsProps } from "@/types/const";
import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import useAuthRedirect from "./useAuthRedirect";
import fetchUserByAddress from "@/lib/supabase/user/fetchUserByAddress";
import { Address } from "viem";

const useUser = () => {
  const { address } = useAccount();
  const [user, setUser] = useState<UserDetailsProps | null>(null);
  useAuthRedirect();

  const fetchUser = useCallback(async () => {
    const response = await fetchUserByAddress(address as Address);
    setUser(response);
  }, [address]);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { user, fetchUser };
};

export default useUser;
