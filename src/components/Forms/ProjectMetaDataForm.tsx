import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DialogClose } from "../ui/dialog";
import React, { useEffect, useState } from "react";
import ProjectMetaDataSubmitButton from "../ProjectMetaDataSubmitButton";
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import usePaymasterAttest from "@/hooks/usePaymasterAttest";
import { ProjectType, ProjectUserProps } from "../ProjectCollaborators/types";
import {
  ContractType,
  contractTypeOptions,
  IUserRole,
  UserRole,
  userRoleOptions,
} from "@/types/projectMetadataForm";

export default function ProjectMetaDataForm({
  project,
  selectedUser,
  request,
  roleId,
}: {
  project?: ProjectType;
  selectedUser: ProjectUserProps;
  request: string;
  roleId?: string;
}) {
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [state, setState] = useState<IUserRole>({
    id: "",
    contract_type: ContractType.Songwriting,
    user_role: UserRole.Artist,
    user_bps: 10000,
  });
  const { attest } = usePaymasterAttest();
  const [bps, setBps] = useState("");

  useEffect(() => {
    if (selectedUser) {
      selectedUser.roles.forEach((role: any) => {
        if (role.id === roleId) {
          setState({
            id: role.id,
            contract_type: role.contract_type,
            user_role: role.user_role,
            user_bps: role.user_bps,
          });
          setBps(String(Number(role.user_bps) / 100));
        }
      });
    }
  }, [selectedUser, roleId]);

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await attest();
      console.log("Attest finished, reloading...");
      setLoading(false);
    } catch (err: any) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Someting went wrong!",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <Label htmlFor="title">Contract Type</Label>
        <Select
          value={state.contract_type}
          onValueChange={(v: any) => {
            if (!v) return;
            setState({
              ...state,
              contract_type: v,
            });
          }}
        >
          <SelectTrigger className="bg-card border-none">
            <div className="flex items-center gap-2">
              <SelectValue className="text-sm font-semibold">
                {
                  contractTypeOptions.find(
                    (v) => v.value === state.contract_type
                  )?.label
                }
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {contractTypeOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {label ?? value}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-3">
        <Label htmlFor="title">User Role</Label>
        <Select
          value={state.user_role}
          onValueChange={(v: any) => {
            if (!v) return;
            setState({
              ...state,
              user_role: v,
            });
          }}
        >
          <SelectTrigger className="bg-card border-none">
            <div className="flex items-center gap-2">
              <SelectValue className="text-sm font-semibold">
                {
                  userRoleOptions.find((v) => v.value === state.user_role)
                    ?.label
                }
              </SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {userRoleOptions.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold">
                      {label ?? value}
                    </span>
                  </div>
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="bps">Splits</Label>
        <Input
          id="user_bps"
          name="user_bps"
          placeholder="100.00%"
          type="number"
          autoCorrect="off"
          required
          min={0}
          max={100}
          value={bps}
          onChange={(e) => {
            setBps(e.target.value);
          }}
          onBlur={(e) => {
            setState({
              ...state,
              user_bps: Number(bps) * 100,
            });
          }}
        />
      </div>
      <div className="flex gap-3 justify-end">
        <DialogClose>
          <Button variant="outline" color="gray">
            Close
          </Button>
        </DialogClose>
        <ProjectMetaDataSubmitButton
          handleSubmit={handleSubmit}
          loading={loading}
          request={request}
        />
      </div>
    </div>
  );
}
