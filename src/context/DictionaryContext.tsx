'use client'

import React, { createContext, useContext } from 'react'
import { Dictionary } from '@/dictionaries/types'

const DictionaryContext = createContext<Dictionary | undefined>(undefined)

interface DictionaryProviderProps {
  children: React.ReactNode
  dictionary: Dictionary
}

export const DictionaryProvider = ({ children, dictionary }: DictionaryProviderProps) => {
  return (
    <DictionaryContext.Provider value={dictionary}>
      {children}
    </DictionaryContext.Provider>
  )
}

export const useDictionary = (): Dictionary => {
  const context = useContext(DictionaryContext)
  if (typeof context === 'undefined') {
    throw new Error('useDictionary must be used within a DictionaryProvider')
  }
  return context
}

export default DictionaryProvider