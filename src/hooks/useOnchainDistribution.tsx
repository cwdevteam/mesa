import { OnchainDistributionProtocol } from "@/types/const";

const useOnchainDistribution = (protocol: OnchainDistributionProtocol) => {
  const isZora = protocol === "Zora";
  const isSound = protocol === "Sound";

  return {
    isSound,
    isZora,
    protocol,
  };
};

export default useOnchainDistribution;
