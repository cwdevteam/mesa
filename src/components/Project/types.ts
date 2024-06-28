export type UserRole = "owner" | "collaborator" | "viewer";

export interface ProjectUser {
  created_at: string | null;
  created_by: string | null;
  invitation_id: string;
  project_id: string;
  updated_at: string | null;
  user_bps: number | null;
  user_id: string;
  user_name: string;
  user_role: UserRole;
}

export interface Project {
  contractHistories?: any;
  name?: string;
  created_at?: string;
  created_by?: string;
  description?: string;
  id?: string;
  project_users?: ProjectUser[];
  updated_at?: string;
  title?: string;
}

export interface User {
  project_users: ProjectUser[];
}

export interface ProjectTabsProps {
  project: Project;
  contractId: string | null;
  contractHistories: any[];
  contractTime: Date | null;
}
