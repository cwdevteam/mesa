import { useProjectProvider } from '@/context/ProjectProvider'
import truncateAddress from '@/lib/truncateAddress'
import { Credit } from '@/types/projectMetadataForm'
import { isInvitation } from './utils'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import ProjectInviteProvider from '@/context/ProjectInviteProvider'
import ProjectInviteDialog from '../ProjectInviteDialog'
import { Button } from '../ui/button'

const Collaborators = () => {
  const { credits } = useProjectProvider()

  return (
    <div className="col-span-4 mt-4 border-border-light dark:border-muted border-[1px] p-5 rounded-lg">
      <div className="flex w-full justify-between items-center mb-4">
        <p className="text-base/4 font-roboto_bold text-black dark:text-white">
          Collaborators
        </p>
        <ProjectInviteProvider>
          <ProjectInviteDialog>
            <Button
              variant="outline"
              className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2 !border-border"
            >
              +<span className="hidden sm:block">&nbsp;Add Collaborator</span>
            </Button>
          </ProjectInviteDialog>
        </ProjectInviteProvider>
      </div>
      <div className="flex flex-col w-full gap-6">
        {credits?.map((credit: Credit, index: number) => (
          <div className="flex justify-between items-center" key={index}>
            <div className="flex gap-4 items-center">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={`https://avatar.vercel.sh/${'user?.id'}.svg`}
                  alt="avatar"
                />
                <AvatarFallback> ME</AvatarFallback>
              </Avatar>
              <div className="flex gap-2 justify-between flex-col">
                <p className="font-roboto_medium text-base/4 text-black dark:text-white">
                  {credit.name}
                </p>
                <p className="text-base/4 text-grey dark:text-white font-roboto_medium">
                  {truncateAddress(credit.address)}
                </p>
              </div>
            </div>
            <div>
              {isInvitation(credit) === false ? (
                <div className="ml-3 w-3 h-3 bg-green-600 rounded-md"></div>
              ) : (
                <div className="ml-3 w-3 h-3 bg-red-600 rounded-md"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Collaborators
