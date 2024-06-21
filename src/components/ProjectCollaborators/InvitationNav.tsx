import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export const InvitationNav = ({
  userId,
  invitationId,
}: {
  userId: string;
  invitationId: string;
}) => {
  const handleCancelInvitation = () => {};

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer select-none">...</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        <DropdownMenuItem asChild>
          <div className="flex">
            <button
              className="grow text-left text-red-500"
              onClick={handleCancelInvitation}
            >
              Cancel Invitation
            </button>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
