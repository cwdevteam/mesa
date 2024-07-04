"use client";

import DeleteProjectSection from "./DeleteProjectSection";
import UpdateProjectSection from "./UpdateProjectSection";

const ProjectDistribution = () => (
  <main className="container py-10 mx-auto max-w-5xl">
    <UpdateProjectSection />
    <DeleteProjectSection />
  </main>
);

export default ProjectDistribution;
