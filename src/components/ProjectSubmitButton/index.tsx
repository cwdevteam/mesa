"use client";

import React, { useState } from "react";
import { useFormStatus } from "react-dom";
import { SignedOffchainAttestation } from "@ethereum-attestation-service/eas-sdk";
import { User } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { AttestationFormFields } from "@/components/AttestationFormFields";
import { MesaProjectEvent } from "@/types/mesa";

type RenderProps = {
  user: User;
  buttonProps: React.ComponentProps<typeof Button>;
};

export function ProjectSubmitButton({
  children,
  user,
}: {
  children: React.ReactNode | ((props: RenderProps) => React.ReactNode);
  eventData: MesaProjectEvent | null;
  user: User;
}) {
  const { pending } = useFormStatus();
  const [submitting, setSubmitting] = useState(false);
  const [attester, setAttester] = useState<string | null>(null);
  const [attestation, setAttestation] =
    useState<SignedOffchainAttestation | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default submit
    event.preventDefault();

    // Prevent double submit
    if (submitting) {
      return;
    }

    // Provide user feedback
    setSubmitting(true);

    // Submit the form programmatically
    const form = event.currentTarget.form?.requestSubmit();

    // Reset state
    setAttester(null);
    setAttestation(null);
    setSubmitting(false);
  };

  const buttonProps = {
    onClick: handleClick,
    disabled: pending || submitting || !attestation,
  };

  return (
    <>
      {typeof children === "function" ? (
        children({
          user,

          buttonProps,
        })
      ) : (
        <Button
          className="relative inline-flex gap-2"
          type="submit"
          {...buttonProps}
        >
          {children}
        </Button>
      )}
      <AttestationFormFields attester={attester} attestation={attestation} />
    </>
  );
}
