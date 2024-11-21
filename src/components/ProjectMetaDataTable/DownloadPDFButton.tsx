import { useProjectProvider } from '@/context/ProjectProvider'
import useDownloadUnsignedVersion from '@/hooks/useDownloadUnsignedVersion'
import fetchUserByAddress from '@/lib/supabase/user/fetchUserByAddress'
import { Collaboratortype } from '@/types/const'
import { Credit } from '@/types/projectMetadataForm'
import { Button } from '../ui/button'

const DownloadPDFButton = () => {
  const { credits, setCollaborators } = useProjectProvider()
  const { downloadUnsignedVersion } = useDownloadUnsignedVersion()

  const handleDownloadUnsignedVersion = () => {
    const collaboratorsPromise = credits.map(async (credit: Credit) => {
      const { address } = credit
      const data = await fetchUserByAddress(address)
      return {
        ...data,
        splitBps: credit.splitBps,
        role: credit.collaboratorType,
      }
    })
    Promise.all(collaboratorsPromise).then((data: Collaboratortype[]) => {
      setCollaborators(data)
      setTimeout(() => {
        downloadUnsignedVersion()
      }, 1000)
    })
  }
  return (
    <Button onClick={handleDownloadUnsignedVersion}>Download Contract</Button>
  )
}

export default DownloadPDFButton
