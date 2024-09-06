'use client'

import { useProjectProvider } from '@/context/ProjectProvider'
import { uploadJson } from '@/lib/ipfs/uploadJson'
import useSoundCreateInputs from './useSoundCreateInputs'
import useSoundCreatePaymasterEdition from './useSoundCreatePaymasterEdition'
import { useState } from 'react'

const useSoundCreate = () => {
  const { name, description, animationUrl, image } = useProjectProvider()
  const { getInputs } = useSoundCreateInputs()
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
      const input = await getInputs(uri, splitArgs)
      await createPaymasterEdition(input)
    } catch (error) {
      console.error(error)
      setLoading(false)
      return { error }
    }
  }

  return { createEdition, soundCreating: loading }
}

export default useSoundCreate
