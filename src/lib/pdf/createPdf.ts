export const createPdf = async ({
  pdfDomElementId,
}: {
  pdfDomElementId: string
}) => {
  try {
    const html2pdf = (await import('html2pdf.js')).default

    const element = document.getElementById(pdfDomElementId)
    if (!element) {
      console.error('Element not found:', pdfDomElementId)
      return
    }
    const options = {
      margin: [0.5, 0.5],
      filename: 'contract-agreement.pdf',
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        allowTaint: true,
      },
      jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
    }

    const pdf = html2pdf().from(element).set(options).toPdf().get('pdf')

    const res = pdf.then((doc: any) => {
      const pageCount = doc?.internal?.getNumberOfPages()
      for (let i = pageCount; i > 0; i--) {
        const pageContent = doc?.internal?.pages[i]
        if (+pageContent[3]?.split(' ')?.[3] < 10) {
          doc?.deletePage(i)
        }
      }

      return doc
    })

    return res
  } catch (error) {
    console.error('Error generating PDF:', error)
  }
}
