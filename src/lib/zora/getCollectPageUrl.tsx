import { Address } from 'viem'
import { IS_TESTNET } from '../consts'

const getCollectPageUrl = (collectionAddress: Address) =>
  `https://${IS_TESTNET ? 'testnet.' : ''}zora.co/collect/${
    IS_TESTNET ? 'bsep' : 'base'
  }:${collectionAddress}/1`

export default getCollectPageUrl
