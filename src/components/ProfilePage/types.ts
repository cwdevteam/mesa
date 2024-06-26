import { UserDetailsProps } from "@/types/const";
import { Dispatch, SetStateAction } from "react";

export interface ProfileDetailsProps {
  editable: boolean;
  loading: boolean;
  user: UserDetailsProps | null;
  onSave: () => void;
  onCancel: () => void;
  setEditable: Dispatch<SetStateAction<boolean>>;
  handleInputChange: (field: keyof UserDetailsProps, value: string) => void;
}
