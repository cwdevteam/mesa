import { Address } from "viem";

const fetchUserByAddress = async (address: Address) => {
  const response = await fetch(`/api/profile?address=${address}`);
  if (!response.ok) return false;
  const data = await response.json();
  return data.data[0];
};

export default fetchUserByAddress;
