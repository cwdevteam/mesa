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
    uploading,
    setUploading,
    creatingStatus,
    setCreatingStatus,
  } = useProjectProvider()
  const { attest } = usePaymasterAttest()
  const [fileSelected, setFileSelected] = useState(false)
  const inputRef = useRef<any>()
  const loading = uploading || creatingStatus
  const buttonLabel = fileSelected ? (
    'Save'
  ) : (
    <FilePlusIcon className="h-4 w-4" />
  )

  const handleFileChange = async (event: any) => {
    setUploading(true)
    const file = event.target.files[0]
    if (file) {
      const { uri } = await uploadFile(file)
      setAnimationUrl(uri)
      setFileSelected(true)
    }
    setUploading(false)
  }

  const handleClick = async () => {
    if (!fileSelected) {
      inputRef.current.click()
      return
    }
    setCreatingStatus(true)
    const response = await attest()
    if (response?.error) {
      setCreatingStatus(false)
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'default',
      })
    }
  }

  return (
    <div>
      <Button
        size={fileSelected ? 'default' : 'icon'}
        className={`${!fileSelected && 'rounded-full'}`}
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <ReloadIcon className="h-4 w-4 animate-spin" />
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
