import { useParams } from "next/navigation";
import { Chain, HttpTransport, PublicClient } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { OnchainDistributionProtocol, ProjectIDType } from "@/types/const";
import useZoraToken from "@/hooks/useZoraToken";
import ZoraTokenForm from "./ZoraTokenForm";
import DistributionSuccess from "./DistributionSuccess";
import StepCard from "../Pages/ZoraPage/StepCard";
import OnchainDistributionProvider from "@/context/OnchainDistributionProvider";

const DistributionOnchain = ({
  protocol,
}: {
  protocol: OnchainDistributionProtocol;
}) => {
  const creatorAccount = useAccount().address || null;
  const walletClient = useWalletClient().data || null;
  const publicClient = usePublicClient() as PublicClient<
    HttpTransport,
    Chain
  > | null;
  const { id } = useParams<ProjectIDType>();
  const { create1155Token, query: tokenQuery } = useZoraToken({
    tokenKey: id,
    publicClient,
    walletClient,
    creatorAccount,
  } as any);
  const isZora = protocol === "Zora";
  const isSuccess = tokenQuery.data && isZora;
  const isMissing = !id;
  const isForm = !isSuccess;

  return (
    <OnchainDistributionProvider protocol={protocol}>
      <section className="flex flex-col gap-2 max-w-screen-md">
        <h2 className="cursor-pointer text-2xl font-bold">
          Publish on {protocol}
        </h2>

        <StepCard className="w-full p-6">
          <>
            {isSuccess && <DistributionSuccess tokenQuery={tokenQuery} />}
            {isMissing && (
              <div className="flex items-center flex-1">
                <p className="text-muted-foreground">
                  Missing &ldquo;tokenKey&rdquo; parameter. Please check the URL
                  and try again.
                </p>
              </div>
            )}
            {isForm && <ZoraTokenForm create1155Token={create1155Token} />}
          </>
        </StepCard>
      </section>
    </OnchainDistributionProvider>
  );
};

export default DistributionOnchain;
