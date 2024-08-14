import {
  FixedPriceParamsType,
  TimedSaleParamsType,
} from "@zoralabs/protocol-sdk";

const getSalesConfig = (config: {
  saleStrategy: string;
  erc20Name?: string;
  erc20Symbol?: string;
  pricePerToken?: bigint;
}) => {
  const timedSaleConfig = {
    type: "timed",
    erc20Name: config.erc20Name,
    erc20Symbol: config.erc20Symbol || "MESA",
  } as TimedSaleParamsType;
  const fixedPriceSaleConfig = {
    type: "fixedPrice",
    pricePerToken: config.pricePerToken,
  } as FixedPriceParamsType;
  return config.saleStrategy === "timed"
    ? timedSaleConfig
    : fixedPriceSaleConfig;
};

export default getSalesConfig;
