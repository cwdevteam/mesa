'use client'

import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import useSoundCreateInputs from './useSoundCreateInputs'
import useSoundCreatePaymasterEdition from './useSoundCreatePaymasterEdition'
import { useEffect, useState } from 'react'

const useSoundCreate = () => {
  const { name, description, animationUrl, image } = useProjectProvider()
  const { getInputs, setMetadataUri, input, setInput } = useSoundCreateInputs()
  const { createPaymasterEdition } = useSoundCreatePaymasterEdition()
  const [loading, setLoading] = useState(false)

  const createEdition = async (splitArgs: any) => {
    setLoading(true)
    try {
      const { uri } = await uploadJson({
        name,
        description,
        image,
        animation_url: animationUrl,
      })
      setMetadataUri(uri)
      await getInputs(splitArgs)
    } catch (error) {
      setLoading(false)
      return { error }
    }
  }

  useEffect(() => {
    const init = async () => {
      await createPaymasterEdition(input)
      setInput(null)
    }

    if (!input) return

    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input])

  return { createEdition, soundCreating: loading }
}

export default useSoundCreate
