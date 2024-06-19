import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";
import { ServerClient } from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

// export async function saveUser(supabase: ServerClient, user: User) {
//     const { data: existingUser, error: fetchError } = await supabase
//       .from('project_users')
//       .select('*')
//       .eq('id', user.id)
//       .single();
  
//     if (fetchError && fetchError.code !== 'PGRST116') {  // PGRST116 indicates no rows found
//       console.error(fetchError);
//       throw new Error(`Error fetching user with id: ${user.id}`);
//     }
  
//     let response;
//     if (existingUser) {
//       // Update existing user
//       response = await supabase
//         .from('project_users')
//         .update(user)
//         .eq('id', user.id);
//     } else {
//       // Insert new user
//       response = await supabase
//         .from('project_users')
//         .insert(user);
//     }
  
//     if (response.error) {
//       console.error(response.error);
//       throw new Error(`Error saving user with id: ${user.id}`);
//     }
  
//     return response.data;
//   }
  

const useUser = () => {
  const { address } = useAccount();
  const [user, setUser] = useState<any[]>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const queryParam = address ? `?address=${address}` : "";
        const response = await fetch(`/api/projects${queryParam}`);
        const data = await response.json();
        const mapped = data.data.map((attestation: any) =>
          getDecodedAttestationData(attestation.result)
        );
        const decodedAttestations = mapped.filter(
          (attestation: any) => attestation !== false
        );
        setAttestations(decodedAttestations.reverse() as any);
      } catch (error) {
        console.error("Failed to fetch attestations:", error);
      }
    };
    if (!address) return;
    init();
  }, [address]);

  return { user };
};

export default useUser;
