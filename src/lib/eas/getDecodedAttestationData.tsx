import getSchemaEncoder from './getSchemaEncoder'

const getDecodedAttestationData = (rawData: any) => {
  const schemaEncoder = getSchemaEncoder()
  try {
    const attestationData = rawData[9]
    const decoded = schemaEncoder.decodeData(attestationData) as any
    decoded.push({ name: 'rawData', value: { value: rawData } })
    return decoded
  } catch (error) {
    console.error(error)
    return false
  }
}

export default getDecodedAttestationData
