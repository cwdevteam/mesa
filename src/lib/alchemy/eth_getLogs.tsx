import { Address, zeroAddress } from 'viem'
import generateAttestedEventTopics from '../eas/generateAttestedEventTopics'
import getAlchemyRpcUrl from './getAlchemyRpcUrl'
import { CHAIN_ID } from '../consts'

export const ethGetLogs = async (address: Address = zeroAddress) => {
  const endpoint = getAlchemyRpcUrl(CHAIN_ID)
  const topics = generateAttestedEventTopics(address)
  const payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'eth_getLogs',
    params: [
      {
        address: ['0x4200000000000000000000000000000000000021'],
        fromBlock: '0x99B9DD',
        toBlock: 'latest',
        topics,
      },
    ],
  }

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json()
    return data.result
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching logs:', error)
    return []
  }
}
