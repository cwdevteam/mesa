"use client";

import React, { useState } from "react";

import { ProjectDetailsCardProps } from "@/types/const";

export default function ProjectDetailsCard({
  projectName,
  projectDescription,
}: ProjectDetailsCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="project-details-card">
      <h2 className="text-2xl font-bold tracking-tight">{projectName}</h2>
      <div
        className={`max-w-prose ${
          expanded ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        {expanded && (
          <p className="text-muted-foreground">{projectDescription}</p>
        )}
        <button
          className="text-blue-500 hover:underline mt-2"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {expanded ? "Read Less" : "Read More"}
        </button>
      </div>
    </section>
  );
}
