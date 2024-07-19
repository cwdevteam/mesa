import { Label } from "@/components/ui/label";
import { Credit, userRoleOptions } from "@/types/projectMetadataForm";
import ProjectmetadataSelect from "./ProjectMetadataSelect";
import { useProjectProvider } from "@/context/ProjectProvider";

const UserRoleSelect = () => {
  const { credits, setCredits } = useProjectProvider();
  const userRole = credits[0].collaboratorType;
  const label = userRoleOptions.find((v) => v.value === userRole)?.label;

  const handleChange = (e: any) => {
    const credit = {
      ...credits[0],
      collaboratorType: e,
    } as Credit;
    setCredits([credit]);
  };

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">User Role</Label>
      <ProjectmetadataSelect
        handleChange={handleChange}
        value={userRole}
        label={label}
        options={userRoleOptions}
      />
    </div>
  );
};

export default UserRoleSelect;
