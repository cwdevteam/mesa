import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import PersonalDetailsForm from "./PersonalDetailsForm";
import { useProfileProvider } from "@/context/ProfileProvider";

const PersonalDetails = ({ loading, onCancel, onSave }: any) => {
  const { editing, setEditing } = useProfileProvider();

  return (
    <div className="flex flex-col gap-2 border-[1px] border-zinc-300 dark:border-zinc-800 rounded-md">
      <div className="bg-zinc-100 dark:bg-zinc-900 flex items-center justify-between gap-2 p-5 rounded-t-md">
        <h5 className="text-lg font-medium">Personal details</h5>
        {!editing ? (
          <Button onClick={() => setEditing(true)}>Edit</Button>
        ) : (
          <div className="flex gap-2">
            <Button variant={"outline"} onClick={onCancel} disabled={loading}>
              Cancel
            </Button>
            {loading ? (
              <Button className="flex gap-2">
                <ReloadIcon className="animate-spin" />
                Saving...
              </Button>
            ) : (
              <Button onClick={onSave}>Save</Button>
            )}
          </div>
        )}
      </div>
      <PersonalDetailsForm />
    </div>
  );
};

export default PersonalDetails;
