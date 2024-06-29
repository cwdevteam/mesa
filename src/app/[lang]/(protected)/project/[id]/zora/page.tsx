"use client";

import React, { useState, useEffect } from "react";
import { Address, Chain, HttpTransport, PublicClient } from "viem";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import {
  createCreatorClient,
  makeMediaTokenMetadata,
} from "@zoralabs/protocol-sdk";
import { CHAIN, CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { getSplitsClient } from "@/lib/clients/splits";
import { uploadFile } from "@/lib/ipfs/uploadToIpfs";
import usePredictedSplitAddress from "@/hooks/usePredictedSplitsAddress";

const dummySplitsConfig = {
  recipients: [
    {
      address: "0xDADe31b9CdA249f9C241114356Ba81349Ca920aB",
      percentAllocation: 70,
    },
    {
      address: "0xbC4D657fAbEe03181d07043E00dbC5751800Ee05",
      percentAllocation: 30,
    },
  ],
  distributorFeePercent: 0,
};

export default function Zora() {
  const [step, setStep] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [existingContracts, setExistingContracts] = useState<Address[]>([]);
  const [selectedContract, setSelectedContract] = useState<Address | null>(
    null
  );
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [tokenMetadata, setTokenMetadata] = useState<object | null>(null);
  const [tokenMetadataURI, setTokenMetadataURI] = useState<string | null>(null);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);

  const creatorAccount = useAccount().address!; // TODO: Handle null case
  const walletClient = useWalletClient().data!; // TODO: Handle null case
  const publicClient = usePublicClient()!; // TODO: Handle null case

  const splitsClient = getSplitsClient({
    chainId: CHAIN_ID,
    publicClient: publicClient as PublicClient<HttpTransport, Chain>, // TODO: fix type
  });

  const { predictedAddress: payoutRecipient, splitExists } =
    usePredictedSplitAddress({
      chainId: CHAIN_ID,
      publicClient: publicClient as PublicClient<HttpTransport, Chain>, // TODO: fix type
      splitsClient,
      splitConfig: dummySplitsConfig,
    });

  useEffect(() => {
    const fetchExistingContracts = async () => {
      const contracts = [
        "0xab95df5235294d82eb54a740b02a2a1dab548fc5",
      ] as Address[]; // Dummy data, replace with actual fetch logic
      setExistingContracts(contracts);
    };
    fetchExistingContracts();
  }, []);

  const createSplit = async () => {
    try {
      const { data, address } = await splitsClient.callData.createSplit(
        dummySplitsConfig
      );

      await walletClient.sendTransaction({
        chain: CHAIN, // TODO: why is this needed?
        to: address as Address,
        account: creatorAccount,
        data,
      });

      // Move to step 2
      setStep(2);
    } catch (error) {
      console.error("Error in creating the split:", error);
    }
  };

  const combineSteps = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setUploading(true);
    try {
      const formData = new FormData(event.currentTarget);
      const mediaFile = formData.get("mediaFile") as File;
      const thumbnailFile = formData.get("thumbnailFile") as File;
      const [mediaUpload, thumbnailUpload] = await Promise.all([
        uploadFile(mediaFile),
        uploadFile(thumbnailFile),
      ]);

      const metadata = await makeMediaTokenMetadata({
        name: formData.get("name") as string,
        description: formData.get("description") as string,
        mediaUrl: mediaUpload.uri,
        thumbnailUrl: thumbnailUpload.uri,
      });

      const tokenMetadataJson = new File(
        [JSON.stringify(metadata)],
        "token.json"
      );

      const { uri: tokenMetadataUri } = await uploadFile(tokenMetadataJson);

      if (payoutRecipient && selectedContract) {
        const creatorClient = createCreatorClient({
          chainId: CHAIN_ID,
          publicClient,
        });

        const { parameters } = await creatorClient.create1155({
          contract: selectedContract as Address,
          token: {
            tokenMetadataURI: tokenMetadataUri,
            payoutRecipient,
          },
          account: creatorAccount,
        });

        const { request } = await publicClient.simulateContract(parameters);

        const txHash = await walletClient.writeContract(request);

        setTokenMetadata(metadata);
        setTokenMetadataURI(tokenMetadataUri);
        setTransactionHash(txHash);

        setSuccessMessage("Token created successfully!");

        console.log("Token created successfully");
      }
    } catch (error) {
      console.error("Error in step 2:", error);
      setSuccessMessage("Error creating token. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const renderStep1 = () => (
    <div>
      {payoutRecipient && (
        <div>
          {splitExists ? (
            <div>
              <p>0xSplits Contract already exists:</p>
              <a
                href={`https://app.splits.org/accounts/${payoutRecipient}?chainId=${CHAIN_ID}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Contract
              </a>
              <button onClick={() => setStep(2)}>Proceed to Step 2</button>
            </div>
          ) : (
            <div>
              <p>0xSplits Contract does not exist yet:</p>
              <pre>{JSON.stringify(dummySplitsConfig, null, 2)}</pre>
              <button onClick={createSplit}>Create 0xSplits Contract</button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  const renderStep2 = () => (
    <form onSubmit={combineSteps}>
      <div>
        <label>
          Name:
          <input type="text" name="name" required />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input type="text" name="description" required />
        </label>
      </div>
      <div>
        <label>
          Media File:
          <input type="file" name="mediaFile" required />
        </label>
      </div>
      <div>
        <label>
          Thumbnail File:
          <input type="file" name="thumbnailFile" required />
        </label>
      </div>
      <div>
        <label>
          Select Existing Zora 1155 Contract:
          <select
            onChange={(e) => setSelectedContract(e.target.value as Address)}
            required
          >
            <option value="" disabled selected>
              Select your option
            </option>
            {existingContracts.map((address) => (
              <option key={address} value={address}>
                {address}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <a
          href={`https://${IS_TESTNET ? "testnet." : ""}zora.co/create`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Create Collection on Zora
        </a>
      </div>
      <button type="submit" disabled={uploading}>
        {uploading ? "Uploading..." : "Create Token"}
      </button>
    </form>
  );

  const renderSuccess = () => (
    <div>
      <p>{successMessage}</p>
      <p>Transaction Hash: {transactionHash}</p>
      <p>Token Metadata URI: {tokenMetadataURI}</p>
      <p>Token Metadata:</p>
      <pre>{JSON.stringify(tokenMetadata, null, 2)}</pre>
    </div>
  );

  return (
    <div>
      <div>Connected Address: {creatorAccount}</div>
      {successMessage ? (
        renderSuccess()
      ) : (
        <>
          <div>
            <button onClick={() => setStep(1)}>Step 1</button>
            <button onClick={() => setStep(2)}>Step 2</button>
          </div>
          {step === 1 && renderStep1()}
          {step === 2 &&
            (splitExists ? renderStep2() : <div>Please complete Step 1.</div>)}
        </>
      )}
    </div>
  );
}
