import React, { useEffect, useRef, useState } from 'react'

import { Button } from '@/components/ui/button'
import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import usePaymasterAttest from '@/hooks/project/usePaymasterAttest'
import ContentView from './ContentView'

const ContractDetailsPage = () => {
  const {
    attestationData,
    description,
    name,
    setUpdating,
    contentHashes,
    setContentHashes,
    updating,
  } = useProjectProvider()
  const [uploading, setUploading] = useState(false)
  const { attest } = usePaymasterAttest()
  const [filesUpdated, setFilesUpdated] = useState(false)
  const fileRef = useRef() as any
  const handleClick = () => {
    fileRef.current.click()
  }

  const handleFilesSelected = async (event: any) => {
    if (!event.target.files) return
    const files = event.target.files
    if (files?.length) {
      setUploading(true)
      const uris = []
      for (const file of files) {
        const { uri: fileUri } = await uploadFile(file)
        const fileDataJson = new File(
          [
            JSON.stringify({
              name: file.name.replace(/\.[^/.]+$/, ''),
              type: file.type,
              uri: fileUri,
            }),
          ],
          'file.json'
        )
        const { uri } = await uploadFile(fileDataJson)
        uris.push(uri)
      }
      setContentHashes([...contentHashes, ...uris])
      setUploading(false)
      setFilesUpdated(true)
    }
  }

  const handleSave = async () => {
    setUpdating(true)
    await attest()
    setUpdating(false)
  }

  const handleDelete = (index: number) => {
    setFilesUpdated(true)
    const temp = [...contentHashes]
    temp.splice(index, 1)
    setContentHashes([...temp])
  }

  useEffect(() => {
    if (!contentHashes?.length) setFilesUpdated(false)
  }, [contentHashes])

  return (
    <div className="w-full">
      <div className="text-center text-2xl font-bold w-full">{name}</div>
      <div className="text-center">{description}</div>
      {attestationData[0] && (
        <div className="flex flex-col justify-center pt-2 items-center gap-4">
          {filesUpdated ? (
            <Button onClick={handleSave} disabled={updating}>
              {updating ? 'Updating...' : 'Save'}
            </Button>
          ) : (
            <Button onClick={handleClick} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Upload File'}
            </Button>
          )}
          <input
            type="file"
            ref={fileRef}
            className="hidden"
            accept="*"
            onChange={handleFilesSelected}
            multiple
          />
        </div>
      )}
      {contentHashes?.length > 0 && (
        <div className="border p-2 mt-4 rounded-md text-muted-foreground">
          <div className="w-full grid grid-cols-4 mt-2">
            <p>Name</p>
            <p>Type</p>
            <p>View</p>
            <p>Delete</p>
          </div>
          {contentHashes.map((contentHash: string, i: number) => (
            <ContentView
              contentHash={contentHash}
              key={contentHash}
              index={i}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default ContractDetailsPage
