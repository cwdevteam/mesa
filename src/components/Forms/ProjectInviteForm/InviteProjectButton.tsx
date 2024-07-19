import { PlusCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const InviteProjectButton = ({ onClick }: { onClick: () => void }) => (
  <Button className="inline-flex gap-2" onClick={onClick}>
    <PlusCircledIcon color="currentColor" className="h-4 w-4" />
    Invite
  </Button>
);

export default InviteProjectButton;
