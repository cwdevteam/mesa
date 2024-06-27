import { useProfileProvider } from "@/context/ProfileProvider";
import { Input } from "../ui/input";

const NameInput = () => {
  const { user, editing, handleInputChange } = useProfileProvider();

  return (
    <div className="flex-1">
      <label htmlFor="user_full_name" className="text-sm">
        Full Name
      </label>
      <Input
        id="user_full_name"
        name="full_name"
        value={user?.full_name || ""}
        disabled={!editing}
        onChange={(e) => handleInputChange("full_name", e.target.value)}
      />
    </div>
  );
};

export default NameInput;
