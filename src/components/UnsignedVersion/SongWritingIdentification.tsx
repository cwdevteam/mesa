import React from 'react'
import PageBreakInside from '../PageBreakInside/PageBreakInside'
import { useProjectProvider } from '@/context/ProjectProvider'
import { Credit } from '@/types/projectMetadataForm'

const SongWritingIdentification = () => {
  const { credits: collaborators } = useProjectProvider()
  return (
    <div className="flex flex-col gap-8">
      <p>
        The parties acknowledge and accept their contribution to the authorship
        or composition of the Musical Work and agree to the distribution of
        copyright ownership as follows:
      </p>
      <div className="flex flex-col gap-4">
        {collaborators.map((item: Credit, index: number) => (
          <div key={index} className="pl-7 flex flex-col gap-2">
            <PageBreakInside>
              <span className="text-md font-semibold">
                Collaborator {index + 1}:
              </span>
            </PageBreakInside>
            <PageBreakInside>
              Legal Name: <span className="underline">{item.name}</span>
            </PageBreakInside>
            <PageBreakInside>
              Contribution (Lyrics, music, or both):{' '}
              <span className="underline">{item.collaboratorType}</span>
            </PageBreakInside>
            <PageBreakInside>
              Ownership percentage:{' '}
              <span className="underline">{item.splitBps / 100}%</span>
            </PageBreakInside>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SongWritingIdentification
