"use client";

import {
  Address,
  Chain,
  HttpTransport,
  PublicClient,
  WalletClient,
} from "viem";

import useZoraToken from "@/hooks/useZoraToken";
import { CHAIN, IS_TESTNET } from "@/lib/consts";

import StepCard from "./StepCard";
import ZoraLogo from "./ZoraLogo";
import ZoraTokenForm from "./ZoraTokenForm";
import ExternalLinkButton from "./ExternalLinkButton";

interface ZoraCardProps {
  publicClient: PublicClient<HttpTransport, Chain>;
  walletClient: WalletClient;
  creatorAccount: Address;
  payoutRecipient: Address | undefined;
  splitExists: boolean | undefined;
  isLoading: boolean;
}

const dummyId = "test"; // TODO: Replace with project ID from URL

export default function ZoraCard({
  publicClient,
  walletClient,
  creatorAccount,
  payoutRecipient,
  splitExists,
  isLoading,
}: ZoraCardProps) {
  const {
    create1155Token,
    query: tokenQuery,
    // reset: resetToken,
  } = useZoraToken({
    id: dummyId,
    publicClient,
    walletClient,
    creatorAccount,
  });

  return (
    <StepCard className="w-full p-6">
      <ZoraLogo className="h-10 w-auto text-foreground" />
      {(() => {
        if (tokenQuery.data) {
          const { url: explorerUrl, name: explorerName } =
            CHAIN.blockExplorers.default;

          // TODO: warn if splits have changed since token was created
          return (
            <>
              <div className="flex items-center flex-grow min-w-12">
                <p className="text-muted-foreground">
                  Your token has been created.
                </p>
              </div>
              {/* TODO: get contract address from transaction receipt and link to zora.co */}
              <div className="flex justify-center md:justify-end flex-wrap gap-2">
                <ExternalLinkButton
                  href={`https://${IS_TESTNET ? "testnet." : ""}zora.co/manage`}
                >
                  Manage on Zora
                </ExternalLinkButton>
                <ExternalLinkButton
                  href={`${explorerUrl}/tx/${tokenQuery.data.transactionHash}`}
                >
                  View on {explorerName}
                </ExternalLinkButton>
              </div>
            </>
          );
        }

        if (payoutRecipient && splitExists) {
          return (
            <ZoraTokenForm
              payoutRecipient={payoutRecipient}
              create1155Token={create1155Token}
            />
          );
        }

        return (
          <div className="flex items-center flex-1">
            <p className="text-muted-foreground">
              {isLoading ? "Loading..." : "Please deploy your Splits contract."}
            </p>
          </div>
        );
      })()}
    </StepCard>
  );
}
