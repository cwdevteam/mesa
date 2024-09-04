import { NULL_ADDRESS, NULL_BYTES32, UINT32_MAX } from './consts'

const getCreateEditionParameter = (
  edition: any,
  formattedSalt: any,
  chain: any,
  metadataUri: any,
  name: any,
  fundingRecipient: any,
  owner: any
) => {
  return {
    precomputedEdition: edition,
    formattedSalt,
    chain,
    createSplit: null,
    editionConfig: {
      baseURI: metadataUri,
      contractURI: metadataUri,
      fundingRecipient,
      name,
      royaltyBPS: 500,
      symbol: name,
      shouldFreezeMetadata: false,
      shouldFreezeTierCreation: false,
    },
    mintConfigs: [
      {
        affiliateFeeBPS: 0,
        affiliateMerkleRoot: NULL_BYTES32,
        startTime: 0,
        endTime: UINT32_MAX,
        maxMintable: UINT32_MAX,
        maxMintablePerAccount: UINT32_MAX,
        mode: 'DEFAULT',
        platform: NULL_ADDRESS,
        price: BigInt(0),
        tier: 1,
      },
    ],
    owner,
    tierConfigs: [
      {
        baseURI: metadataUri,
        cutoffTime: 0,
        isFrozen: false,
        maxMintableLower: 0,
        maxMintableUpper: UINT32_MAX,
        mintRandomnessEnabled: false,
        tier: 1,
      },
    ],
  }
}

export default getCreateEditionParameter
