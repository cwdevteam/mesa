import { ServerClient, createServerClient } from "@/lib/supabase/server";
import { cookies } from "next/headers";
import { Locale } from "@/../i18n.config";
import { getDictionary } from "@/lib/dictionary";
import DashboardPage from "@/components/DashboardPage";

async function getProjects(supabase: ServerClient) {
  const { data: projects, error } = await supabase
    .schema("mesa")
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) {
    console.error(error);
    return [];
  }
  return projects;
}

export default async function Dashboard({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const { dashboard: dict } = await getDictionary(lang);
  const supabase = createServerClient(cookies());
  const projects = await getProjects(supabase);
  return <DashboardPage dict={dict} lang={lang} projects={projects} />;
}
