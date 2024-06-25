import { cookies } from "next/headers";
import { ServerClient, createServerClient } from "./createServerClient";

export * from "./createServerClient";
export * from "./createMiddlewareClient";

export async function getUser(supabase: ServerClient) {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  if (!user || error) {
    console.error("Error retrieving user:", error);
    return;
  }
  return user;
}

export const useSupabase = () => {
  const cookieStore = cookies();
  const supabase = createServerClient(cookieStore);

  return supabase;
};
