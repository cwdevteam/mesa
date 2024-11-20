import React from 'react'
import CollaboratorsInfo from './CollaboratorsInfo'
import { useProjectProvider } from '@/context/ProjectProvider'

const MasterRecordingIdentification = () => {
  const { name } = useProjectProvider()

  return (
    <div className="flex flex-col gap-3 text-md">
      {' '}
      <h2 className="pl-7 text-lg font-bold">
        2. Identification of the Master Recording
      </h2>
      <p>
        The contracting parties have collaborated in the recording and
        production of the Master Recording titled{' '}
        <span className="underline">{name}</span>, which fixes a performance of
        the Musical Work identified in clause 1 of this agreement.
      </p>
      <p>
        The parties acknowledge and accept their contribution to the recording
        and production of the Master Recording and agree to the distribution of
        ownership as follows:
      </p>
      <CollaboratorsInfo />
    </div>
  )
}

export default MasterRecordingIdentification
