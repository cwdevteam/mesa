interface LabeledParagraphsProps {
  heading: string
  paragraphs: { text: string; children?: { text: string }[] }[]
  serialNumber: number
}

const LabeledParagraphs: React.FC<LabeledParagraphsProps> = ({
  heading,
  paragraphs,
  serialNumber,
}) => {
  return (
    <div
      className="w-full"
      style={{ pageBreakBefore: 'auto', pageBreakAfter: 'auto' }}
    >
      <h2
        className="text-lg font-bold"
        style={{
          pageBreakInside: 'avoid',
          pageBreakBefore: 'auto',
          pageBreakAfter: 'auto',
        }}
      >
        {serialNumber}. {heading}
      </h2>
      <div className="space-y-4 pt-2">
        {paragraphs.map((paragraph, index) => (
          <div
            key={index}
            style={{
              pageBreakInside: 'avoid',
              pageBreakBefore: index === 0 ? 'auto' : 'avoid',
              pageBreakAfter: 'auto',
            }}
            className="flex gap-2"
          >
            <span className="ml-4">{String.fromCharCode(97 + index)}.</span>
            <div className="flex-1">
              {typeof paragraph === 'string' ? (
                <p>{paragraph}</p>
              ) : (
                <>
                  <p
                    dangerouslySetInnerHTML={{ __html: paragraph.text }}
                    className=""
                    style={{ pageBreakInside: 'avoid' }}
                  />
                  {paragraph.children && (
                    <div className="ml-4 mt-2 space-y-2">
                      {paragraph.children.map((child, childIndex) => (
                        <div
                          key={childIndex}
                          style={{
                            pageBreakInside: 'avoid',
                            pageBreakBefore: 'auto',
                            pageBreakAfter: 'auto',
                          }}
                          className="flex gap-2"
                        >
                          <span className="text-gray-600">
                            {childIndex + 1}.
                          </span>
                          <p style={{ pageBreakInside: 'avoid' }}>
                            {child.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LabeledParagraphs
