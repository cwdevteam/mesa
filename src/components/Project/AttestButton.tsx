"use client";

import { Button } from "../ui/button";
import usePaymasterAttest from "@/hooks/usePaymasterAttest";

const AttestButton = () => {
  const { attest } = usePaymasterAttest();

  return (
    <Button size="default" className="rounded-full" onClick={() => attest()}>
      Save
    </Button>
  );
};

export default AttestButton;
