"use client";

import React, { useState } from "react";
import { useProjectProvider } from "@/context/ProjectProvider";

export default function ProjectDetailsCard() {
  const [expanded, setExpanded] = useState(false);
  const { name, description } = useProjectProvider();

  return (
    <section className="project-details-card">
      <h2 className="text-2xl font-bold tracking-tight">{name}</h2>
      <div
        className={`max-w-prose ${
          expanded ? "overflow-auto" : "overflow-hidden"
        }`}
      >
        {expanded && <p className="text-muted-foreground">{description}</p>}
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
