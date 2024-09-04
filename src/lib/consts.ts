import { base, baseSepolia } from 'wagmi/chains'

export const EAS = '0x4200000000000000000000000000000000000021'
export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === 'true'
export const CHAIN = IS_TESTNET ? baseSepolia : base
export const CHAIN_ID = CHAIN.id
export const ATTESTATION_SCHEMA =
  '0x97431f9b6fde65954b44b7e34ae220df9af55184ad69f7ffdee5afc213575690'
export const ATTESTATION_REF_UID =
  '0x0000000000000000000000000000000000000000000000000000000000000000'
export const DEFAULT_IMAGE =
  'https://ipfs.decentralized-content.com/ipfs/bafkreicih4xebijdfnhfbaickrpvchtys3i2f5hgjmbntciov2tqvlt5qy'
export const UINT32_MAX = 4294967295
export const NULL_ADDRESS = '0x0000000000000000000000000000000000000000'
export const NULL_BYTES32 =
  '0x0000000000000000000000000000000000000000000000000000000000000000'
export const REFERRAL_RECIPIENT = '0x8C9a3Ec0049F7E873760057a3A8bD163c9878aCE' // mesawallet.eth

export const EMPTY_RECIPIENT = { address: '', percentAllocation: 0 }
export const DEFAULT_DISTRIBUTOR_FEE = 0

export const PERCENTAGE_SCALE = 1e6
export const SPLIT_RECIPIENT_MAX_DECIMALS = 4

export const PullSplitFactory = '0x80f1B766817D04870f115fEBbcCADF8DBF75E017'
