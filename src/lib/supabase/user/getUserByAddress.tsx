import { createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Address } from "viem";

const getUserByAddress = async (address: Address) => {
  const supabase = createServerClient(cookies());
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .contains("addresses", [address]);
  if (error) {
    throw error;
  }
  return data;
};

export default getUserByAddress;
