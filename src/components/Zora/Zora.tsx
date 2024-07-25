import { useParams } from "next/navigation";
import { Chain, HttpTransport, PublicClient } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import { ProjectIDType } from "@/types/const";
import useZoraToken from "@/hooks/useZoraToken";
import ZoraTokenForm from "./ZoraTokenForm";
import ZoraSuccess from "./ZoraSuccess";
import StepCard from "../Pages/ZoraPage/StepCard";

const Zora = () => {
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
  const isSuccess = tokenQuery.data;
  const isMissing = !id;
  const isForm = !isSuccess;

  return (
    <section className="flex flex-col gap-4 max-w-screen-md">
      <h2 className="cursor-pointer text-2xl font-bold">Publish on Zora</h2>

      <StepCard className="w-full p-6">
        <>
          {isSuccess && <ZoraSuccess tokenQuery={tokenQuery} />}
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
  );
};

export default Zora;
