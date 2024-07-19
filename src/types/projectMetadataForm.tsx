export enum ContractType {
  Master = "Master",
  Songwriting = "Songwriting",
}

export enum UserRole {
  Owner = "Owner",
  Producer = "Producer",
  Songwriter = "Songwriter",
  Artist = "Artist",
  Manager = "Manager",
  Publisher = "Publisher",
  Lawyer = "Lawyer",
}

interface SelectOption {
  value: string;
  label: string;
}

export const contractTypeOptions: SelectOption[] = [
  { value: ContractType.Master, label: "Master" },
  { value: ContractType.Songwriting, label: "Songwriting" },
];

export const userRoleOptions: SelectOption[] = [
  { value: UserRole.Owner, label: "Owner" },
  { value: UserRole.Producer, label: "Producer" },
  { value: UserRole.Songwriter, label: "Writer" },
  { value: UserRole.Artist, label: "Artist" },
  { value: UserRole.Manager, label: "Manager" },
  { value: UserRole.Publisher, label: "Publisher" },
  { value: UserRole.Lawyer, label: "Lawyer" },
];

export interface IUserRole {
  id: string;
  contract_type: string;
  user_role: string;
  user_bps: number;
}

export type Credit = {
  contractType: ContractType;
  collaboratorType: UserRole;
  name: string;
  splitBps: number;
};

export const defaultCredit = {
  contractType: ContractType.Songwriting,
  collaboratorType: UserRole.Owner,
  name: "",
  splitBps: 10000,
};
