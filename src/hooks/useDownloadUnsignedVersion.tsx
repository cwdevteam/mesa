'use client'
import { createPdf } from '@/lib/pdf/createPdf'
import { useState } from 'react'

const useDownloadUnsignedVersion = () => {
  const [downloading, setDownloading] = useState(false)

  const downloadUnsignedVersion = async () => {
    setDownloading(true)
    try {
      const doc = await createPdf({ pdfDomElementId: 'unsigned-version' })
      doc?.save('contract-agreement.pdf')
    } catch (error) {
      console.error('Error generating PDF:', error)
    } finally {
      setDownloading(false)
    }
  }

  return {
    downloadUnsignedVersion,
    downloading,
  }
}

export default useDownloadUnsignedVersion
