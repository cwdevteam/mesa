import { usePaymasterProvider } from "@/context/Paymasters";
import easAttest from "@/lib/eas/attest";

const usePaymasterAttest = () => {
  const { writeContracts, capabilities } = usePaymasterProvider();

  const attest = async (args: any[]) =>
    easAttest(writeContracts, capabilities, args);

  return { attest };
};

export default usePaymasterAttest;
