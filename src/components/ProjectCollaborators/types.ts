export interface ProjectUserProps {
  user_id: string;
  user_name: string;
}

export interface ProjectType {
  projectUsers: ProjectUserProps[];
}

export interface CardProps {
  data: any;
  allData: ProjectUserProps[];
  project?: ProjectType;
}

export interface ProjectInvitationProps {}
