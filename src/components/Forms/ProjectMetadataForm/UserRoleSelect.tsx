import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole, userRoleOptions } from "@/types/projectMetadataForm";

const UserRoleSelect = () => {
  const userRole = UserRole.Artist;

  return (
    <div className="grid gap-3">
      <Label htmlFor="title">User Role</Label>
      <Select value={userRole}>
        <SelectTrigger className="bg-card border-none">
          <div className="flex items-center gap-2">
            <SelectValue className="text-sm font-semibold">
              {userRoleOptions.find((v) => v.value === userRole)?.label}
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
  );
};

export default UserRoleSelect;
