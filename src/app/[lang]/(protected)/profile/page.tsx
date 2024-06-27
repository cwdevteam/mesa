import ProfilePage from "@/components/ProfilePage";
import { useSupabase } from "@/lib/supabase/server";

export default async function Profile() {
  const supabase = useSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <ProfilePage user={user} />;
}
