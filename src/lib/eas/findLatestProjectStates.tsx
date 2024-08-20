export const findLatestProjectStates = (attestations: any[]) => {
  let uniqueProjectMap = new Map<string, any>();
  let creationMap = new Map<string, any>();

  for (let i = 0; i < attestations.length; i++) {
    const attestation = attestations[i];
    const refUID = attestation.refUID;

    const isProjectCreation =
      refUID ===
        '0x0000000000000000000000000000000000000000000000000000000000000000' ||
      !refUID;

    if (isProjectCreation) {
      const uid = attestation.id;
      creationMap.set(uid, attestation);
    } else {
      if (!uniqueProjectMap.has(refUID)) {
        uniqueProjectMap.set(refUID, attestation);
      } else {
        const existingAttestation = uniqueProjectMap.get(refUID);
        const isLatestUpdate =
          attestation.timeCreated > existingAttestation.timeCreated;
        if (isLatestUpdate) {
          uniqueProjectMap.set(refUID, attestation);
        }
      }
    }
  }

  let finalResults: any[] = [];

  creationMap.forEach((creationAttestation, uid) => {
    if (uniqueProjectMap.has(uid)) {
      finalResults.push(uniqueProjectMap.get(uid));
    } else {
      finalResults.push(creationAttestation);
    }
  });

  return finalResults;
};