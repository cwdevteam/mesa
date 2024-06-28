import { useProfileProvider } from "@/context/ProfileProvider";
import { Input } from "../ui/input";

const UsernameInput = () => {
  const { user, editing, handleInputChange } = useProfileProvider();

  return (
    <div>
      <label htmlFor="user_name" className="text-sm">
        Username
      </label>
      <Input
        id="user_name"
        name="name"
        value={user?.username || ""}
        disabled={!editing}
        onChange={(e: any) => handleInputChange("username", e.target.value)}
      />
    </div>
  );
};

export default UsernameInput;
