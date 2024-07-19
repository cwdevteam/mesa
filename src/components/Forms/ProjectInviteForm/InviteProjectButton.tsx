import { PlusCircledIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

export default function InviteProjectButton({
  handleSubmit,
}: {
  handleSubmit: () => void;
}) {
  return (
    <Button className="inline-flex gap-2" onClick={handleSubmit}>
      <PlusCircledIcon color="currentColor" className="h-4 w-4" />
      Invite
    </Button>
  );
}
