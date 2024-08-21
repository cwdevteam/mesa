const getFormattedAttestations = (attestations: any) => {
  const formattedAttestions = attestations.map((attestation: any) => {
    const decodedData = JSON.parse(attestation.decodedDataJson)
    return {
      title: decodedData[0].value.value,
      description: decodedData[0].value.value,
      projectId: attestation.id,
      metadataUri: decodedData[1].value.value,
      schemaId: attestation.schemaId,
    }
  })

  return formattedAttestions
}

export default getFormattedAttestations
