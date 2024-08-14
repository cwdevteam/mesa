import React from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { useOnchainDistributionProvider } from "@/context/OnchainDistributionProvider";

const ZoraSaleStrategyTabs = () => {
  const { zoraSaleStrategy, setZoraSaleStrategy } =
    useOnchainDistributionProvider();

  return (
    <Tabs defaultValue="project" value={zoraSaleStrategy}>
      <TabsList>
        <TabsTrigger
          value="fixedPrice"
          onClick={() => setZoraSaleStrategy("fixedPrice")}
        >
          ✧777
        </TabsTrigger>
        <TabsTrigger
          value="timed"
          onClick={() => setZoraSaleStrategy("timed")}
          className="flex gap-3"
        >
          <span>✧111</span>
          <Image
            alt="uniswap"
            width={25}
            height={25}
            src="https://ipfs.decentralized-content.com/ipfs/QmbcAkQ3mnRj261CJLsvwM8vHHN5pNaVFvCzc3ivjw7rXY"
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
};

export default ZoraSaleStrategyTabs;
