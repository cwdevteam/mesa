import { ZERO_ADDRESS, ZERO_BYTES32 } from "@ethereum-attestation-service/eas-sdk";

type Schema = {
  schema: string,
  resolver: string,
  revocable: boolean,
  getUID: (chainId: number) => string
}

export const json: Schema = {
  schema: 'string json',
  resolver: ZERO_ADDRESS,
  revocable: false,
  getUID: (chainId: number) => {
    switch (chainId) {
      case 10:
        return '0x873375380cbef56797a6607d4f69452ef687b28c736b9f11c0782ae1487a3940';
      default:
        return ZERO_BYTES32;
    }
  }
} as const

const schemas = {
  json
} as const

type SchemaName = keyof typeof schemas

export const getSchema = (name: SchemaName): Schema | null => {
  return schemas[name] || null;
}

export default schemas