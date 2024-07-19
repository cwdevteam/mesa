import { Pencil1Icon, ReloadIcon } from '@radix-ui/react-icons'
import { Button } from '@/components/ui/button'

export default function ProjectMetaDataSubmitButton({
  handleSubmit,
  loading,
  request
}: {
  handleSubmit: () => void
  loading: boolean
  request: string
}) {
  return (
    <>
      {loading ? (
        <Button className="inline-flex gap-2" onClick={handleSubmit}>
          <ReloadIcon color="currentColor" className="h-4 w-4 animate-spin" />
          {request === "edit" ? "Updating..." : "Creating..."}
        </Button>
      ) : (
        <Button className="inline-flex gap-2" onClick={handleSubmit}>
          <Pencil1Icon color="currentColor" className="h-4 w-4" />
          {request === "edit" ? "Update" : "Create"}
        </Button>
      )}
    </>
  )
}
