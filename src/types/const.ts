import { Locale } from '@/../i18n.config';

export type ProjectTab = 'project' | 'contract' | 'setting';

export interface ProjectPageProps {
  params: {
    lang: Locale;
    id: string;
  };
};

export interface ProjectDetailsComponentProps {
  project: any;
};

export interface ProjectDetailsCardProps {
  projectName: string;
  projectDescription: string;
};

export interface ContractDetailsPageProps {
  project: {
    name: string;
    description: string;
    collaborators: {
      name: string;
      contractType: string;
      role: string;
      bps: string;
    }[];
  };
  contractId: string | undefined;
};

export interface UserData {
  name: string;
  contractType: string;
  role: string;
  bps: string;
}

export interface UserMatrixCardProps {
  data: UserData;
}

export interface ProjectCollaboratorsProps {
  project: any;
}
