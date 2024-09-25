'use client'

import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import { useProjectProvider } from '@/context/ProjectProvider'
import { useRef, useState } from 'react'
import { Icons } from '../Icons'
import AudioWavePlayer from './AudioWavePlayer'

const UploadButton = () => {
  const { setAnimationUrl, uploadingAudio, setUploadingAudio, creatingStatus } =
    useProjectProvider()
  const [fileSelected, setFileSelected] = useState(false)
  const inputRef = useRef<any>()
  const loading = uploadingAudio || creatingStatus
  const [audioUrl, setAudioUrl] = useState(null)

  const handleFileChange = async (event: any) => {
    setUploadingAudio(true)
    const file = event.target.files[0]
    if (file) {
      const { uri } = await uploadFile(file)
      setAnimationUrl(uri)
      setAudioUrl(URL.createObjectURL(file) as any)
      setFileSelected(true)
    }
    setUploadingAudio(false)
  }

  const handleClick = async () => {
    if (!fileSelected) inputRef.current.click()
  }

  const handleDelete = () => {
    inputRef.current.value = ''
    setFileSelected(false)
  }

  return (
    <div className="col-span-6 mt-6 pr-5 pl-3">
      <button
        className="rounded-lg py-8 flex flex-col items-center justify-center border-danger border-dashed border-[1px] w-full bg-danger/20 min-h-[110px]"
        onClick={handleClick}
        disabled={loading}
        type="button"
      >
        {fileSelected ? (
          <AudioWavePlayer src={audioUrl} onCancel={handleDelete} />
        ) : (
          <>
            <Icons.audio />
            <p className="text-danger text-[10px] font-roboto_bold">
              Select an Audio
            </p>
            <p className="text-[8px] text-grey font-roboto_bold">
              Or drag file here to upload{' '}
            </p>
          </>
        )}
      </button>
      <p className="text-[7px] text-grey pt-2 font-roboto_italic pl-2">
        Accepted audio files: <br />
        {`WAV, MP3, M4A, FLAC, AIFF, WMA`}
      </p>
      <input
        type="file"
        id="fileUpload"
        style={{ display: 'none' }}
        accept=".mp3, .wav, .aif, .aiff"
        onChange={handleFileChange}
        ref={inputRef}
      />
    </div>
  )
}

export default UploadButton
