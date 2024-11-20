import React from 'react'
import PageBreakInside from '../PageBreakInside/PageBreakInside'
import { useProjectProvider } from '@/context/ProjectProvider'
import { UserDetailsProps } from '@/types/const'

const SongWritingIdentification = () => {
  const { collaborators } = useProjectProvider()
  return (
    <div className="flex flex-col gap-8">
      <p>
        The parties acknowledge and accept their contribution to the authorship
        or composition of the Musical Work and agree to the distribution of
        copyright ownership as follows:
      </p>
      <div className="flex flex-col gap-4">
        {collaborators?.map((item: UserDetailsProps, index: number) => (
          <div key={index} className="pl-7 flex flex-col gap-2">
            <PageBreakInside>
              <span className="text-md font-semibold">
                Collaborator {index + 1}:
              </span>
            </PageBreakInside>
            <PageBreakInside>
              Legal Name: <span className="underline">{item.legal_name}</span>
            </PageBreakInside>
            <PageBreakInside>
              Email: <span className="underline">{item.email}</span>
            </PageBreakInside>
            <PageBreakInside>
              Contribution (Lyrics, music, or both):{' '}
              <span className="underline">{'Music'}</span>
            </PageBreakInside>
            <PageBreakInside>
              Ownership percentage: <span className="underline">50%</span>
            </PageBreakInside>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SongWritingIdentification
