import { ProjectPageProps } from "@/types/const";
import ProjectProvider from "@/context/ProjectProvider";
import ProjectPage from "@/components/Project/ProjectPage";

const Project = ({}: ProjectPageProps) => (
  <ProjectProvider>
    <ProjectPage />
  </ProjectProvider>
);

export default Project;
