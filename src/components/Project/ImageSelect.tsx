'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import { useState } from 'react'
import { Button } from '../ui/button'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import { toast } from '../ui/use-toast'

const ImageSelect = () => {
  const {
    setImage,
    uploadingImage,
    setUploadingImage,
    creatingStatus,
    setCreatingStatus,
  } = useProjectProvider()
  const [fileSelected, setFileSelected] = useState<boolean>(false)
  const loading = uploadingImage || creatingStatus
  const { attest } = usePaymasterAttest()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadingImage(true)
    if (!event.target.files) return
    const file = event.target.files[0]
    if (file) {
      const { uri } = await uploadFile(file)
      setImage(uri)
      setFileSelected(true)
    }
    setUploadingImage(false)
  }

  const handleClick = async () => {
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
    <div className="pt-4">
      {fileSelected ? (
        <Button
          size="default"
          className="rounded-full"
          onClick={handleClick}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Save'}
        </Button>
      ) : (
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="thumbnailFile">
            {uploadingImage ? 'Uploading Thumbnail...' : 'Thumbnail File:'}
          </Label>
          {!uploadingImage && (
            <Input
              type="file"
              name="thumbnailFile"
              id="thumbnailFile"
              required
              onChange={handleFileChange}
            />
          )}
        </div>
      )}
    </div>
  )
}

export default ImageSelect
