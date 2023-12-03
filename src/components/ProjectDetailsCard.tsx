'use client'

import { useState } from "react";
import { Database } from '@/types/supabase';

type ProjectUserType = Database['mesa']['Tables']['project_users']['Row'];

type ProjectType = Database['mesa']['Tables']['projects']['Row'] & {
  project_users: ProjectUserType[];
};

export default function ProjectDetailsCard({ project }: { project: ProjectType }) {
  const [expanded, setExpanded] = useState(false)
  return (
    <section>
      <h2 className="text-2xl font-bold tracking-tight">{project.title}</h2>
      <div className="max-w-prose overflow-hidden">
        <p className={`text-muted-foreground ${expanded ? '' : 'line-clamp-3'}`}>
          {project.description}
        </p>
        <button className="text-blue-500 hover:underline" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Read Less' : 'Read More'}
        </button>
      </div>
    </section>
  )
}