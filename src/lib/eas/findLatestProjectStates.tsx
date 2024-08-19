export const findLatestProjectStates = (attestations: any[]) => {
  let uniqueProjectMap = new Map<string, any>();
  let creationMap = new Map<string, any>();

  for (let i = 0; i < attestations.length; i++) {
    const attestation = attestations[i];
    const refUID = attestation.result[5];
    const isProjectCreation =
      refUID ===
        "0x0000000000000000000000000000000000000000000000000000000000000000" ||
      !refUID;
    const isProjectUpdate = !uniqueProjectMap.has(refUID);

    if (isProjectCreation) {
      const uid = attestation.result[0];
      creationMap.set(uid, attestation);
    } else {
      if (isProjectUpdate) {
        uniqueProjectMap.set(refUID, attestation);
      } else {
        const existingAttestation = uniqueProjectMap.get(refUID);
        const isLatestUpdate = i < attestations.indexOf(existingAttestation);
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
