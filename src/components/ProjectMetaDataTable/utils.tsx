import {
  ProjectInvitationProps,
  ProjectUserProps,
} from "../ProjectCollaborators/types";

export const isInvitation = (obj: ProjectUserProps | ProjectInvitationProps) =>
  !!(obj as any)?.status;
