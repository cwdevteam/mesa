import InvitePage from "@/components/Pages/InvitePage";
import ProjectProvider from "@/context/ProjectProvider";

const Invite = async () => (
  <ProjectProvider>
    <InvitePage />
  </ProjectProvider>
);

export default Invite;
