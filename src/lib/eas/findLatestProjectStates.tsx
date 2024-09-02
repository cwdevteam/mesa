export const findLatestProjectStates = (attestations: any[]) => {
  let uniqueProjectMap = new Map<string, any>()
  let creationMap = new Map<string, any>()

  for (let i = 0; i < attestations.length; i++) {
    const attestation = attestations[i]
    const refUID = attestation.refUID
    const isProjectCreation =
      refUID ===
        '0x0000000000000000000000000000000000000000000000000000000000000000' ||
      !refUID
    const isProjectUpdate = !uniqueProjectMap.has(refUID)

    if (isProjectCreation) {
      const uid = attestation.id
      creationMap.set(uid, attestation)
    } else {
      if (isProjectUpdate) {
        uniqueProjectMap.set(refUID, attestation)
      } else {
        const existingAttestation = uniqueProjectMap.get(refUID)
        const isLatestUpdate =
          attestation.timeCreated > existingAttestation.timeCreated
        if (isLatestUpdate) {
          uniqueProjectMap.set(refUID, attestation)
        }
      }
    }
  }

  let finalResults: any = []

  creationMap.forEach((creationAttestation, cuid) => {
    if (uniqueProjectMap.has(cuid)) {
      const uniqueAttestation = uniqueProjectMap.get(cuid)
      finalResults.push(uniqueAttestation)
    } else {
      finalResults.push(creationAttestation)
    }
  })

  uniqueProjectMap.forEach((uniqueAttestation, uuid) => {
    if (!creationMap.has(uuid)) {
      finalResults.push(uniqueAttestation)
    }
  })

  return finalResults
}
