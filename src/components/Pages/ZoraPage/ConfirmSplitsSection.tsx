import { useRef } from "react";
import StepCard from "./StepCard";
import { generatePrivateKey, privateKeyToAddress } from "viem/accounts";
import { getAddress } from "viem";
import type { CreateSplitConfig } from "@0xsplits/splits-sdk/types";
import { useRouter } from "next/navigation";
import { v4 as uuid } from "uuid";
import { Button } from "@/components/ui/button";

const dummyAddresses = [generatePrivateKey(), generatePrivateKey()].map((key) =>
  getAddress(privateKeyToAddress(key))
);

const dummySplitsConfig: CreateSplitConfig = {
  recipients: [
    {
      address: dummyAddresses[0],
      percentAllocation: 50,
    },
    {
      address: dummyAddresses[1],
      percentAllocation: 50,
    },
  ],
  distributorFeePercent: 0,
};

const ConfirmSplitsSection = () => {
  const router = useRouter();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const generateURL = () => {
    try {
      const newConfig = textareaRef.current
        ? JSON.parse(textareaRef.current.value)
        : null;
      if (!newConfig) throw new Error("Missing splits config");
      const encodedConfig = encodeURIComponent(JSON.stringify(newConfig));
      router.push(`?uid=${uuid()}&splits=${encodedConfig}`);
    } catch (e) {
      alert("Invalid JSON configuration.");
      console.error(e);
    }
  };

  return (
    <section className="flex flex-col gap-4 max-w-screen-md">
      <h2 className="cursor-pointer text-2xl font-bold">
        Step 0: Confirm splits configuration
      </h2>
      <StepCard className="w-full p-6 items-center">
        <div className="flex flex-col gap-4 flex-1">
          <textarea
            className="text-sm text-muted-foreground p-6 rounded-lg bg-muted"
            ref={textareaRef}
            defaultValue={JSON.stringify(dummySplitsConfig, null, 2)}
            rows={10}
            cols={60}
            required={true}
          />
          <Button onClick={generateURL}>Generate URL</Button>
        </div>
      </StepCard>
    </section>
  );
};

export default ConfirmSplitsSection;
