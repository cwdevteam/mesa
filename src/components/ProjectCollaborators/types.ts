export interface ProjectUserProps {
  user_id: string;
  user_name: string;
  roles: any[];
}

export interface ProjectType {
  projectUsers: ProjectUserProps[];
}

export interface CardProps {
  data: any;
  allData: ProjectUserProps[];
  project?: ProjectType;
}

export interface ProjectMetaDataDialogProps
  extends React.HTMLAttributes<HTMLDivElement> {
  project?: any;
  selectedUser?: any;
  request?: string;
  roleId?: string;
  open?: boolean;
  setOpen?: (value: boolean) => void;
}

export interface ProjectInvitationProps {}
