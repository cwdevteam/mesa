import { toast } from "@/components/ui/use-toast";
import { easAbi } from "@/lib/abi/eas";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Log, parseEventLogs } from "viem";
import { useCallsStatus } from "wagmi/experimental";

const useProjectCreateRedirect = (callsStatusId?: string) => {
  const { push } = useRouter();

  const { data: callsStatus } = useCallsStatus({
    id: callsStatusId as string,
    query: {
      enabled: !!callsStatusId,
      refetchInterval: (data) =>
        data.state.data?.status === "CONFIRMED" ? false : 500,
    },
  });

  useEffect(() => {
    if (callsStatus?.status !== "CONFIRMED") return;
    const logs = parseEventLogs({
      abi: easAbi,
      logs: callsStatus.receipts?.[0]?.logs as Log[],
    }) as any;
    const refId = logs?.[0]?.args?.uid;
    toast({
      title: "Success",
      description: "Project Created Successfully!",
      variant: "default",
    });
    push(`/project/${refId}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [callsStatus]);
};

export default useProjectCreateRedirect;
