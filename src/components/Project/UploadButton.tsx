'use client'

import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import { Button } from '../ui/button'
import { FilePlusIcon, ReloadIcon } from '@radix-ui/react-icons'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import { useProjectProvider } from '@/context/ProjectProvider'
import { useRef, useState } from 'react'
import { toast } from '../ui/use-toast'

const UploadButton = () => {
  const {
    setAnimationUrl,
    uploadingAudio,
    setUploadingAudio,
    creatingStatus,
    setCreatingStatus,
  } = useProjectProvider()
  const { attest } = usePaymasterAttest()
  const [fileSelected, setFileSelected] = useState(false)
  const inputRef = useRef<any>()
  const loading = uploadingAudio || creatingStatus
  const buttonLabel = fileSelected ? (
    'Save'
  ) : (
    <FilePlusIcon className="h-4 w-4" />
  )

  const handleFileChange = async (event: any) => {
    setUploadingAudio(true)
    const file = event.target.files[0]
    if (file) {
      const { uri } = await uploadFile(file)
      setAnimationUrl(uri)
      setFileSelected(true)
    }
    setUploadingAudio(false)
  }

  const handleClick = async () => {
    if (!fileSelected) {
      inputRef.current.click()
      return
    }
    setCreatingStatus(true)
    const response = await attest()
    if (response?.error) {
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'default',
      })
    }
    setCreatingStatus(false)
  }

  return (
    <div>
      <Button
        className={`${!fileSelected && 'rounded-full'}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <div className="flex gap-2 items-center">
            <ReloadIcon className="h-4 w-4 animate-spin" />
            <p className="text-[12px]">
              {uploadingAudio && 'Uploading...'}
              {creatingStatus && 'Updating...'}
            </p>
          </div>
        ) : (
          buttonLabel
        )}
      </Button>
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
