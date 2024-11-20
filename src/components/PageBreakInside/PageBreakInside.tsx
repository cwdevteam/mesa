import React from 'react'

const PageBreakInside = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={className}
      style={{
        pageBreakInside: 'avoid',
      }}
    >
      {children}
    </div>
  )
}

export default PageBreakInside
