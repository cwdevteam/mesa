import bs58 from 'bs58'
import { hexToBytes } from 'viem'

const getFormattedContentHashes = (contentHashes: string[]) => {
  const hashes = contentHashes.map((hash: any) => {
    const prefixBytes = Buffer.from([0x12, 0x20])
    const combined = Buffer.concat([prefixBytes, hexToBytes(hash)])
    return `ipfs://${bs58.encode(combined)}`
  })

  return hashes
}

export default getFormattedContentHashes
