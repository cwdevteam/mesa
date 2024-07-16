export const findUniqueMatches = (attestations: any[]) => {
  let filteredResults: any[] = [];
  let fifthIndexMap = new Map<any, number>();

  for (let i = 0; i < attestations.length; i++) {
    const fifthIndexValue = attestations[i].result[5];
    if (!fifthIndexMap.has(fifthIndexValue)) {
      fifthIndexMap.set(fifthIndexValue, i);
    }
  }

  let excludeIndices = new Set<number>();

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

  Array.from(fifthIndexMap.entries()).forEach(([fifthIndexValue, index]) => {
    if (!excludeIndices.has(index)) {
      filteredResults.push(attestations[index]);
    }
  });

  return filteredResults;
};
