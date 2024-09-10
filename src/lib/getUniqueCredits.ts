const getUniqueCredits = (credits: any) => {
  if (!credits) return []
  const aggregatedData = credits.reduce((acc: any, credit: any) => {
    if (!acc[credit.address]) {
      acc[credit.address] = {
        address: credit.address,
        contractTypes: new Set(),
        collaboratorTypes: new Set(),
        names: new Set(),
        splitBps: 0,
      }
    }
    acc[credit.address].contractTypes.add(credit.contractType)
    acc[credit.address].collaboratorTypes.add(credit.collaboratorType)
    acc[credit.address].names.add(credit.name)
    acc[credit.address].splitBps = credit.splitBps
    return acc
  }, {})

  const aggregatedArray = Object.values(aggregatedData)

  return aggregatedArray
}

export default getUniqueCredits
