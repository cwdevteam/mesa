'use client'

import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadFile } from '@/lib/ipfs/uploadToIpfs'
import { useRef, useState } from 'react'
import { Icons } from '../Icons'
import Image from 'next/image'

const ImageSelect = () => {
  const { setImage, uploadingImage, setUploadingImage, creatingStatus } =
    useProjectProvider()
  const [fileSelected, setFileSelected] = useState<boolean>(false)
  const loading = uploadingImage || creatingStatus
  const inputRef = useRef<any>()
  const [imageUrl, setImageUrl] = useState(null)

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploadingImage(true)
    if (!event.target.files) return
    const file = event.target.files[0]
    if (file) {
      const { uri } = await uploadFile(file)
      setImage(uri)
      setImageUrl(URL.createObjectURL(file) as any)
      setFileSelected(true)
    }
    setUploadingImage(false)
  }

  const handleClick = async () => {
    if (!fileSelected) inputRef.current.click()
  }

  return (
    <div className="col-span-6 mt-6 h-full pl-5 pr-3">
      <button
        className="rounded-lg flex flex-col items-center justify-center border-danger border-dashed border-[1px] w-full bg-danger/20 min-h-[110px]"
        onClick={handleClick}
        disabled={loading}
        type="button"
      >
        {fileSelected ? (
          <label htmlFor="thumbnailFile">
            <div className="w-[100px] h-[70px] relative overflow-hidden rounded-lg">
              <Image
                src={imageUrl || ''}
                alt=""
                layout="fill"
                className="absolute object-cover object-center"
              />
            </div>
          </label>
        ) : (
          <div className="py-8 flex flex-col justify-center items-center">
            <Icons.audio />
            <p className="text-danger text-[10px] font-roboto_bold">
              Select an Image
            </p>
            <p className="text-[8px] text-grey font-roboto_bold">
              Or drag image here to upload
            </p>
          </div>
        )}
      </button>
      <p className="text-[7px] text-grey pt-2 font-roboto_italic pl-2 dark:text-white">
        For album covers:
        <br />
        {`Recommended images are 3000x3000 square JPG format`}
      </p>
      <input
        type="file"
        id="thumbnailFile"
        name="thumbnailFile"
        style={{ display: 'none' }}
        accept=".jpeg, .png, .jpg"
        onChange={handleFileChange}
        ref={inputRef}
      />
    </div>
  )
}

export default ImageSelect
