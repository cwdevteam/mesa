import DashboardPage from "@/components/DashboardPage";
import { getUser, useSupabase } from "@/lib/supabase/server";

const Dashboard = async () => {
  const supabase = useSupabase();
  const user = await getUser(supabase);
  return <DashboardPage email={user?.email} />;
};

export default Dashboard;
