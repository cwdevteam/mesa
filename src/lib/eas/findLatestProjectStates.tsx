export const findLatestProjectStates = (attestations: any[]) => {
  let uniqueProjectMap = new Map<string, any>(); // Maps refUID to the latest attestation
  let creationMap = new Map<string, any>(); // Maps project creation attestations (no refUID)

  for (let i = 0; i < attestations.length; i++) {
    const attestation = attestations[i];
    const refUID = attestation.result[5]; // Assuming refUID is at index 5

    if (
      refUID ===
        "0x0000000000000000000000000000000000000000000000000000000000000000" ||
      !refUID
    ) {
      // This is a project creation attestation
      const uid = attestation.result[0]; // Assuming uid is at index 0
      creationMap.set(uid, attestation);
    } else {
      // This is an update to a project
      if (!uniqueProjectMap.has(refUID)) {
        uniqueProjectMap.set(refUID, attestation);
      } else {
        const existingAttestation = uniqueProjectMap.get(refUID);
        // Replace only if the current attestation is an earlier update (lower index)
        if (i < attestations.indexOf(existingAttestation)) {
          uniqueProjectMap.set(refUID, attestation);
        }
      }
    }
  }

  // Combine the creation attestations with the latest updates
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
