import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  //   DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from '../ui/use-toast'

export const InvitationNav = ({
  userId,
  invitationId,
}: {
  userId: string
  invitationId: string
}) => {
  const router = useRouter()

  const handleCancelInvitation = async () => {
    try {
      const { data } = await axios.post('/api/project_invitation/cancel', {
        userId,
        invitationId,
      })

      if (data && data.status) {
        router.reload()
        toast({
          title: 'Success',
          description: 'Cancel invitation successfully',
          variant: 'default',
        })
      }
    } catch (err: any) {
      toast({
        title: 'Failed',
        description: 'Something went wrong!',
        variant: 'destructive',
      })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <span className="cursor-pointer select-none">...</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        {/* <DropdownMenuItem asChild>
          <div className="flex">
            <button className="grow text-left">Edit Invitaion</button>
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
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
  )
}
