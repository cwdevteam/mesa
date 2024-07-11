import getDecodedAttestationData from "@/lib/eas/getDecodedAttestationData";

export const getProjects = async (queryParam: any) => {
  const response = await fetch(`/api/projects${queryParam}`);
  return await response.json();
};

export const findUniqueMatches = (attestations: any[]) => {
  let filteredResults: any[] = [];
  let fifthIndexMap = new Map<any, number>();

  // Step 1: Track unique 5th indices and their corresponding index
  for (let i = 0; i < attestations.length; i++) {
    const fifthIndexValue = attestations[i].result[5];
    if (!fifthIndexMap.has(fifthIndexValue)) {
      fifthIndexMap.set(fifthIndexValue, i);
    }
  }

  // Step 2: Create a set to track indices that need to be excluded
  let excludeIndices = new Set<number>();

  // Step 3: Check for each attestation if it should be excluded
  for (let i = 0; i < attestations.length; i++) {
    const currentAttestation = attestations[i];
    const fifthIndexValue = currentAttestation.result[5];

    for (let j = 0; j < attestations.length; j++) {
      if (i !== j && attestations[j].result[0] === fifthIndexValue) {
        excludeIndices.add(j);
        break;
      }
    }
  }

  // Step 4: Include only one attestation per unique 5th index and not excluded
  for (let [fifthIndexValue, index] of fifthIndexMap) {
    if (!excludeIndices.has(index)) {
      filteredResults.push(attestations[index]);
    }
  }

  return filteredResults;
};

export const getDecodedProjectsData = (data: any) => {
  const mapped = data.data.map((attestation: any) =>
    getDecodedAttestationData(attestation.result)
  );
  const decodedAttestations = mapped.filter(
    (attestation: any) => attestation !== false
  );
  return decodedAttestations;
};
