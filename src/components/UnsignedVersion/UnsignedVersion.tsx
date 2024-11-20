import MusicalWorkIdentification from './MusicalWorkIdentification'
import LabeledParagraphs from '../LabeledParagraphs/LabeledParagraphs'
import CollaboratorsSign from './CollaboratorsSign'
import { splitTypes } from '@/lib/constants/splitTypes'

const UnsignedVersion = () => {
  const date = new Date()
  const currentDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

  const splitType = 'Songwriting'

  const splitTypeObject = splitTypes.find((split) => split.label === splitType)

  const IdentificationComponent =
    splitTypeObject?.IdentificationComponent as React.JSXElementConstructor<unknown>

  const headings = splitTypeObject?.headings
    ? splitTypeObject?.headings({
        type: 'vote',
        adminName: 'adminName',
        votePercentage: 51,
      })
    : []

  const mainHeadingText = splitTypeObject?.pdfText?.headingText
  const serialNumber = splitTypeObject?.serialNumber || 3
  const showCollaboratorsInfo = splitTypeObject?.showCollaboratorsInfo || false

  return (
    <div className="bg-white w-full min-h-screen fixed top-[99999999px] left-0 flex justify-center">
      <div
        id="unsigned-version"
        className="text-black max-w-[9.5in] w-full bg-white p-[0.3in] text-[11pt] leading-normal  relative box-border min-h-[11in]"
      >
        <div className="flex flex-col gap-10">
          <div className="text-center flex flex-col gap-10 page-break-inside-avoid">
            <p className="text-2xl font-bold">
              Copyright ownership agreement for {mainHeadingText}, made as a
              joint work.
            </p>
            <p className="text-md">
              This agreement is entered into on {currentDate} between the
              following parties
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <div>
              <MusicalWorkIdentification
                showCollaboratorsInfo={showCollaboratorsInfo}
              />
            </div>

            <div>
              <IdentificationComponent />
            </div>

            {headings.map((heading, index) => (
              <div key={index}>
                <LabeledParagraphs
                  serialNumber={index + serialNumber}
                  heading={heading.heading}
                  paragraphs={heading.paragraphs}
                />
              </div>
            ))}
            <CollaboratorsSign />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UnsignedVersion
