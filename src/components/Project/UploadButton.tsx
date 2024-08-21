'use client'

import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import { Button } from '../ui/button'
import { FilePlusIcon, ReloadIcon } from '@radix-ui/react-icons'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import { useProjectProvider } from '@/context/ProjectProvider'
import { useRef, useState } from 'react'
import { toast } from '../ui/use-toast'

const UploadButton = () => {
  const { setAnimationUrl, uploadingAudio, setUploadingAudio } =
    useProjectProvider()
  const { attest } = usePaymasterAttest()
  const [updating, setUpdating] = useState(false)
  const [fileSelected, setFileSelected] = useState(false)
  const inputRef = useRef<any>()
  const loading = uploadingAudio || updating
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
    setUpdating(true)
    const response = await attest()
    if (response?.error) {
      toast({
        title: 'Error',
        description: 'Failed to update project.',
        variant: 'default',
      })
    }
    setUpdating(false)
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
