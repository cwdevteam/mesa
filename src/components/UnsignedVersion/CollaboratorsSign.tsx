import React from 'react'
import PageBreakInside from '../PageBreakInside/PageBreakInside'
import { useProjectProvider } from '@/context/ProjectProvider'
import { Collaboratortype } from '@/types/const'

const CollaboratorsSign = () => {
  const { collaborators } = useProjectProvider()
  return (
    <div className="flex flex-col gap-6">
      <p>In witness whereof, the collaborators sign:</p>
      {collaborators?.map((_: Collaboratortype, index: number) => (
        <PageBreakInside key={index}>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">Collaborator {index + 1}:</p>
            <p>
              Legal Name:
              <span>
                _______________________________________________________
              </span>
            </p>
            <div className="flex gap-2">
              <p>
                Signature:
                <span> _________________________________</span>
              </p>
              <p>
                Date:
                <span> _________________________________</span>
              </p>
            </div>
          </div>
        </PageBreakInside>
      ))}
    </div>
  )
}

export default CollaboratorsSign
