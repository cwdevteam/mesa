"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectProvider } from "@/context/ProjectProvider";

const Price = () => {
  const { setEthPrice } = useProjectProvider();

  return (
    <div className="grid w-full items-center gap-2">
      <Label htmlFor="tokenPrice">Price per token (ETH):</Label>
      <Input
        type="text"
        name="tokenPrice"
        id="tokenPrice"
        defaultValue="0"
        inputMode="decimal"
        pattern="^\d+(\.\d+)?$"
        required
        onChange={(event) => setEthPrice(Number(event.target.value))}
      />
    </div>
  );
};

export default Price;
