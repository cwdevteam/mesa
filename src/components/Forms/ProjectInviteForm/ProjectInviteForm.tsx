"use client";

import NameAndEmailInput from "./NameAndEmailInput";
import MessageAndButtons from "./MessageAndButtons";

const ProjectInviteForm = () => (
  <div className="flex flex-col gap-6">
    <NameAndEmailInput />
    <MessageAndButtons />
  </div>
);

export default ProjectInviteForm;
