import React from 'react'
import PageBreakInside from '../PageBreakInside/PageBreakInside'
import { collaboratorsInfoPDF } from '@/lib/constants/collaboratorsInfoPDF'
import { useProjectProvider } from '@/context/ProjectProvider'
import { Credit } from '@/types/projectMetadataForm'
import { UserDetailsProps } from '@/types/const'

const CollaboratorsInfo = ({
  contributionType = 'master',
}: {
  contributionType?: 'songwriting' | 'master'
}) => {
  const { collaborators } = useProjectProvider()
  const contributionText = collaboratorsInfoPDF[contributionType].contribution
  return (
    <div className="flex flex-col gap-3">
      {collaborators?.map((collaborator: UserDetailsProps, index: number) => (
        <PageBreakInside key={index} className="pl-7 flex flex-col gap-2">
          <PageBreakInside>
            <span className="text-md font-semibold">
              Collaborator {index + 1}:
            </span>
          </PageBreakInside>
          <PageBreakInside>
            Legal Name:{' '}
            <span className="underline">{collaborator.legal_name}</span>
          </PageBreakInside>
          <PageBreakInside>
            {contributionText}:{' '}
            <span className="underline">{'Songwriting'}</span>
          </PageBreakInside>
          <PageBreakInside>
            Ownership percentage: <span className="underline">{'50%'}</span>
          </PageBreakInside>
        </PageBreakInside>
      ))}
    </div>
  )
}

export default CollaboratorsInfo
