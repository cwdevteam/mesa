import { base, baseSepolia } from "wagmi/chains";

export const EAS = "0x4200000000000000000000000000000000000021";
export const IS_TESTNET = process.env.NEXT_PUBLIC_TEST === "true"
export const CHAIN = IS_TESTNET ? baseSepolia : base;
export const CHAIN_ID = CHAIN.id;
export const ATTESTATION_SCHEMA =
  "0x97431f9b6fde65954b44b7e34ae220df9af55184ad69f7ffdee5afc213575690";
export const ATTESTATION_REF_UID =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
export const DEFAULT_IMAGE =
  "https://ipfs.decentralized-content.com/ipfs/bafkreicih4xebijdfnhfbaickrpvchtys3i2f5hgjmbntciov2tqvlt5qy";
export const UINT32_MAX = 4294967295;
export const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
export const NULL_BYTES32 =
  "0x0000000000000000000000000000000000000000000000000000000000000000";
  
