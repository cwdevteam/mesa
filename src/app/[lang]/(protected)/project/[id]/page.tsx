import { TimelineProvider } from "@/context/TimelineContext";
import {
  ServerClient,
  createServerClient,
  getUser,
} from "@/lib/supabase/server";
import { User } from "@supabase/supabase-js";
import { Locale } from "@/../i18n.config";
import ProjectTabs from "@/components/Project/Tabs";

async function getProject(supabase: ServerClient, user: User, id: string) {
  const { data: project, error } = await supabase
    .schema("mesa")
    .from("projects")
    .select("*, project_users(*)")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      `Project with id: ${id} not found for user with id: ${user.id}`
    );
  }

  return project;
}

export default async function Project({
  params: { lang, id },
}: {
  params: { lang: Locale; id: string };
}) {
  return (
    <TimelineProvider>
      <main className="container flex flex-col gap-6 py-10 items-center lg:items-start w-full">
        <ProjectTabs
          project={{
            created_at: "10-12-2024",
            created_by: "Hakob",
            description:
              "Description for project 132456 Description for project 132456 Description for project 132456 Description for project 132456",
            id: "someTestId12343",
            project_users: [
              {
                created_at: "05-06-2024",
                created_by: "Test proj user",
                invitation_id:
                  "0xfdaf6a25541eb40156f51190a435934d9d9b8584218e8b4b54e4b087c5da4e0d",
                project_id:
                  "0xfdaf6a25541eb40156f51190a435934d9d9b8584218e8b4b54e4b087c5da4e0d",
                updated_at: "01-01-2024",
                user_bps: 89987987,
                user_id:
                  "0xfdaf6a25541eb40156f51190a435934d9d9b8584218e8b4b54e4b087c5da4e0d",
                user_name: "Vagho",
                user_role: "owner",
              },
            ],
            updated_at: "78997",
            title: "Title",
          }}
          contractId={"5sadasdsadsadadssadsadsad"}
          contractHistories={[
            { projectUser: { user_name: "Project User" }, created_at: "5456" },
          ]}
          contractTime={null}
        />
      </main>
    </TimelineProvider>
  );
}
