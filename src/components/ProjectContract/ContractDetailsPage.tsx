import React, { useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import getIpfsLink from '@/lib/ipfs/getIpfsLink'

const ContractDetailsPage = () => {
  const {
    attestationData,
    description,
    name,
    setExternalUrl,
    setUpdating,
    externalUrl,
  } = useProjectProvider()
  const [fileSelected, setFileSelected] = useState(false)
  const [uploading, setUploading] = useState(false)
  const { attest } = usePaymasterAttest()

  const fileRef = useRef() as any
  const handleClick = () => {
    fileRef.current.click()
  }

  const handleFileSelected = async (event: any) => {
    if (!event.target.files) return
    const file = event.target.files[0]
    if (file) {
      setUploading(true)
      const { uri } = await uploadFile(file)
      setExternalUrl(uri)
      setUploading(false)
      setFileSelected(true)
    }
  }

  const handleSave = async () => {
    setUpdating(true)
    await attest()
  }

  const handleView = () => {
    window.open(getIpfsLink(externalUrl), '_blank')
  }

  return (
    <div className="w-full">
      <div className="text-center text-2xl font-bold w-full">{name}</div>
      <div className="text-center">{description}</div>
      {attestationData[0] ? (
        <div className="flex flex-col justify-center pt-2 items-center gap-4">
          {fileSelected ? (
            <Button onClick={handleSave}>Save</Button>
          ) : externalUrl ? (
            <Button onClick={handleView}>View PDF</Button>
          ) : (
            <Button onClick={handleClick}>
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </Button>
          )}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept=".pdf"
            onChange={handleFileSelected}
          />
        </div>
      ) : (
        <div className="text-center mt-5">Contract has not started yet</div>
      )}
    </div>
  )
}

export default ContractDetailsPage
