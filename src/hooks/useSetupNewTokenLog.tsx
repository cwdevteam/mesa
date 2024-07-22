import { useEffect, useState } from "react";
import { parseEventLogs } from "viem";
import { usePublicClient } from "wagmi";
import { zoraCreator1155ImplABI } from "@zoralabs/protocol-deployments";

const useSetupNewTokenLog = ({ hash }: any) => {
  const publicClient = usePublicClient() as any;
  const [setupNewTokenLog, setSetupNewTokenLog] = useState<any>();

  useEffect(() => {
    const init = async () => {
      const transaction = await publicClient.getTransactionReceipt({
        hash,
      });
      const { logs } = transaction;
      const parsedLogs = parseEventLogs({
        abi: zoraCreator1155ImplABI,
        logs,
        eventName: "SetupNewToken",
      });
      setSetupNewTokenLog(parsedLogs[0]);
    };
    if (!hash) return;
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return { data: setupNewTokenLog };
};

export default useSetupNewTokenLog;
