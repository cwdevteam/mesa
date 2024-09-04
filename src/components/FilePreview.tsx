import { TimelineFile } from '@/context/TimelineContext'

export default function FilePreview({ file }: { file: TimelineFile }) {
  if (file.type.startsWith('image/')) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={file.data} alt={file.name} />
  } else if (file.type.startsWith('video/')) {
    return (
      <video controls>
        <source src={file.data} type={file.type} />
        Your browser does not support the video tag.
      </video>
    )
  } else if (file.type.startsWith('audio/')) {
    return (
      <audio controls>
        <source src={file.data} type={file.type} />
        Your browser does not support the audio element.
      </audio>
    )
  } else {
    return <p>Unsupported file type: {file.type}</p>
  }
}
