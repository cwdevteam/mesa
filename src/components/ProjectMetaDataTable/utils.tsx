import { ProjectUserProps, ProjectInvitationProps } from ".";

export const isInvitation = (obj: ProjectUserProps | ProjectInvitationProps) =>
  !!(obj as any)?.status;
