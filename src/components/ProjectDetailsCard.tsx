"use client";

import { useState } from "react";
import { Database } from "@/types/supabase";

type ProjectUserType = Database["mesa"]["Tables"]["project_users"]["Row"];

type ProjectType = Database["mesa"]["Tables"]["projects"]["Row"] & {
  project_users: ProjectUserType[];
};

export default function ProjectDetailsCard({
  project,
}: {
  project: ProjectType;
}) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
    </section>
  );
}
