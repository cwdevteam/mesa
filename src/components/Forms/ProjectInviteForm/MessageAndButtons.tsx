import { Textarea } from "@/components/ui/textarea";
import ProjectInviteFormButtons from "./ProjectInviteFormButtons";

const MessageAndButtons = () => (
  <div className="flex flex-col gap-4">
    <p>
      Send a message to your collaborators with relevant information about the
      project status.
    </p>
    <Textarea
      id="description"
      name="description"
      placeholder=""
      autoCapitalize="none"
      autoCorrect="off"
    />
    <p>
      They will be invited to the project with the default permission set for
      attorney. You can update permissions anytime.
    </p>
    <ProjectInviteFormButtons />
  </div>
);

export default MessageAndButtons;
