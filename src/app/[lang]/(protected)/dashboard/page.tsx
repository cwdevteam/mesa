import DashboardPage from "@/components/DashboardPage";
import { createServerClient, getUser } from "@/lib/supabase/server";
import { cookies } from "next/headers";

const Dashboard = async () => {
  const supabase = createServerClient(cookies());
  const user = await getUser(supabase);

  return <DashboardPage email={user?.email} />;
};

export default Dashboard;
