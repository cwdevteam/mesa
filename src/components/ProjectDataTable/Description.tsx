import useMetadata from '@/hooks/useMetadata'

const Description = ({ row }: any) => {
  const metadataUri = row.original.metadataUri
  const { description } = useMetadata(metadataUri)
  return <p className="truncate">{description || metadataUri}</p>
}

export default Description
