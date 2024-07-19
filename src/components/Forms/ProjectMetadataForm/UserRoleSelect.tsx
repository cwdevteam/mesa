import { Label } from "@/components/ui/label";
import { UserRole, userRoleOptions } from "@/types/projectMetadataForm";
import ProjectmetadataSelect from "./ProjectMetadataSelect";

const UserRoleSelect = () => {
  const userRole = UserRole.Artist;
  const label = userRoleOptions.find((v) => v.value === userRole)?.label;

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">User Role</Label>
      <ProjectmetadataSelect
        value={userRole}
        label={label}
        options={userRoleOptions}
      />
    </div>
  );
};

export default UserRoleSelect;
