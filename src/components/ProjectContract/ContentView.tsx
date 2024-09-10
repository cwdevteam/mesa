import getIpfsLink from '@/lib/ipfs/getIpfsLink'
import { ContentType } from '@/types/const'
import { useQuery } from '@tanstack/react-query'
import { Button } from '../ui/button'
import { Icons } from '../Icons'
import { useProjectProvider } from '@/context/ProjectProvider'

const ContentView = ({
  contentHash,
  index,
}: {
  contentHash: string
  index: number
}) => {
  const { setContentHashes, contentHashes } = useProjectProvider()
  const getContent = async (): Promise<ContentType> => {
    const response = await fetch(getIpfsLink(contentHash))
    const data = await response.json()
    return data
  }

  const { data: content, isFetched } = useQuery({
    queryKey: [`getContent-${contentHash}`],
    queryFn: getContent,
  })

  const handleDelete = () => {
    const temp = [...contentHashes]
    temp.splice(index, 1)
    setContentHashes([...temp])
  }

  return (
    <div className="w-full grid grid-cols-4 my-1 items-center pb-2">
      {isFetched && (
        <>
          <p>{content?.name}</p>
          <p>{content?.type}</p>
          <Button
            type="button"
            className="w-fit"
            onClick={() =>
              window.open(getIpfsLink(content?.uri || ''), '_blank')
            }
          >
            <Icons.eye />
          </Button>
          <Button type="button" className="w-fit" onClick={handleDelete}>
            <Icons.delete />
          </Button>
        </>
      )}
    </div>
  )
}

export default ContentView
