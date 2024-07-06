import { usePaymasterProvider } from "@/context/Paymasters";
import { useProjectProvider } from "@/context/ProjectProvider";
import easAttest from "@/lib/eas/attest";
import getAttestArgs from "@/lib/eas/getAttestArgs";
import getEncodedAttestationData from "@/lib/eas/getEncodedAttestationData";
import { Address } from "viem";
import { useAccount } from "wagmi";
import { useParams } from 'next/navigation'

const usePaymasterAttest = () => {
  const { name, description } = useProjectProvider();
  const { writeContracts, capabilities } = usePaymasterProvider();
  const { address } = useAccount();
  const {id} = useParams<string>()

  const attest = async () => {
    const encodedAttestation = getEncodedAttestationData(
      name,
      description,
      [],
      [address as Address],
      []
    );
    const args = getAttestArgs(encodedAttestation, id);
    easAttest(writeContracts, capabilities, args);
  };

  return { attest };
};

export default usePaymasterAttest;
