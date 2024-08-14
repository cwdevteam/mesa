import { useState } from "react";

const useZoraSaleStrategy = () => {
  const [zoraSaleStrategy, setZoraSaleStrategy] =
    useState<string>("fixedPrice");
  const isFixedPrice = zoraSaleStrategy === "fixedPrice";
  const isTimed = zoraSaleStrategy === "timed";

  return { isFixedPrice, isTimed, zoraSaleStrategy, setZoraSaleStrategy };
};

export default useZoraSaleStrategy;
