import { useProfileProvider } from "@/context/ProfileProvider";
import { Input } from "../ui/input";

const WebsiteInput = () => {
  const { user, editing, handleInputChange } = useProfileProvider();

  return (
    <div className="flex-1">
      <label htmlFor="user_website" className="text-sm">
        Website
      </label>
      <Input
        id="user_website"
        name="website"
        value={user?.website || ""}
        onChange={(e) => handleInputChange("website", e.target.value)}
        disabled={!editing}
      />
    </div>
  );
};

export default WebsiteInput;
