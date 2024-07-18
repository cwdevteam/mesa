import fetchUserByAddress from "@/lib/supabase/user/fetchUserByAddress";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { Address } from "viem";
import { useAccount } from "wagmi";

const useAuthRedirect = () => {
  const { address, isConnected } = useAccount();
  const { push } = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkUser = async () => {
      const responseLib = await fetchUserByAddress(address as Address);
      if (pathname.includes("/invite")) return;
      if (pathname.endsWith("/create")) return;
      if (!responseLib) return push("/profile");
      if (pathname === "/en") push("/dashboard");
    };

    if (!(isConnected && address)) {
      if (pathname.includes("/invite")) return;
      push("/");
      return;
    }
    checkUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected, address]);
};

export default useAuthRedirect;
