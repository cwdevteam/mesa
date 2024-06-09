"use client";

import { User } from "@supabase/supabase-js";
import { ProjectDataTable } from "@/components/ProjectDataTable";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const DashboardPage = ({ lang, dict, projects }: any) => {
  const { isConnected } = useAccount();
  const { push } = useRouter();
  console.log("SWEETS isConnected", isConnected);

  useEffect(() => {
    if (!isConnected) {
      console.log("SWEETS REDIRECT TO HOME", !isConnected);
      push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  const mockUser = {
    id: "123",
    app_metadata: { UserAppMetadata: true },
    user_metadata: { UserMetadata: true },
    aud: "string",
    confirmation_sent_at: "string",
    recovery_sent_at: "string",
    email_change_sent_at: "string",
    new_email: "string",
    new_phone: "string",
    invited_at: "string",
    action_link: "string",
    email: "string",
    phone: "string",
    created_at: "string",
    confirmed_at: "string",
    email_confirmed_at: "string",
    phone_confirmed_at: "string",
    last_sign_in_at: "string",
    role: "string",
    updated_at: "string",
    identities: [""],
    factors: [""],
  } as any as User;

  return (
    <main className="grid gap-10 container mx-auto py-10 content-start">
      <div className="flex justify-between gap-4">
        <h2 className="text-2xl font-semibold tracking-tight">Your Projects</h2>
        <Button>Create Project</Button>
      </div>
      <ProjectDataTable data={projects} />
    </main>
  );
};

export default DashboardPage;
