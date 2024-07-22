import { useParams } from "next/navigation";
import { Address, Chain, HttpTransport, PublicClient } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import ZoraCard from "./ZoraCard";
import { ProjectIDType } from "@/types/const";

const CreateTokenSection = () => {
  const creatorAccount = useAccount().address || null;
  const walletClient = useWalletClient().data || null;
  const publicClient = usePublicClient() as PublicClient<
    HttpTransport,
    Chain
  > | null;
  const { id } = useParams<ProjectIDType>();

  return (
    <section className="flex flex-col gap-4 max-w-screen-md">
      <h2 className="cursor-pointer text-2xl font-bold">Publish on Zora</h2>
      <ZoraCard
        publicClient={publicClient as any}
        walletClient={walletClient!}
        creatorAccount={creatorAccount as Address}
        payoutRecipient={creatorAccount as Address}
        splitExists
        isLoading={false}
        tokenKey={id || null}
      />
    </section>
  );
};

export default CreateTokenSection;
