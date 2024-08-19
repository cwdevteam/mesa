import React from 'react'

import { Button } from '@/components/ui/button'
import ContractHistoryTable from '../Project/ContractHistoryTable'
import { useProjectProvider } from '@/context/ProjectProvider'

const ContractDetailsPage = () => {
  const { attestationData, description, name } = useProjectProvider()

  return (
    <div className="w-full">
      <div className="text-center text-2xl font-bold w-full">{name}</div>
      <div className="text-center">{description}</div>
      {attestationData[0] ? (
        <div className="flex flex-col justify-center pt-10 items-center gap-4">
          <span>
            Contract created at <span className="font-bold">{null}</span>
          </span>
          <Button>Download Signed Document</Button>
          <div className="w-full flex justify-center max-w-3xl pt-6">
            <ContractHistoryTable />
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">Contract has not started yet</div>
      )}
    </div>
  )
}

export default ContractDetailsPage
