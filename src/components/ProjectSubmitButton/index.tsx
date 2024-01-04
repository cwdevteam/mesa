'use client'

import React, { useEffect, useState } from 'react';
import { useFormStatus } from "react-dom"
import { WalletInstance, useWallet } from "@thirdweb-dev/react"
import { SignedOffchainAttestation } from '@ethereum-attestation-service/eas-sdk';
import { User } from "@supabase/supabase-js"

import { Button } from "@/components/ui/button"
import { AttestationFormFields } from '@/components/AttestationFormFields';

import { useEASClient } from '@/context/EASClientProvider';
import { createAndSignOffchainAttestation } from "@/lib/eas/client"
import { MesaProjectEvent } from '@/types/mesa';
import { Icons } from '../Icons';

type RenderProps = {
  user: User
  wallet?: WalletInstance
  buttonProps: React.ComponentProps<typeof Button>
}

export function ProjectSubmitButton({
  children,
  eventData,
  user
}: {
  children: React.ReactNode | ((props: RenderProps) => React.ReactNode),
  eventData: MesaProjectEvent | null
  user: User,
}) {
  const { pending } = useFormStatus()
  const wallet = useWallet()
  const eas = useEASClient()

  const [submitting, setSubmitting] = useState(false)
  const [attester, setAttester] = useState<string | null>(null)
  const [attestation, setAttestation] = useState<SignedOffchainAttestation | null>(null)

  useEffect(() => {
    async function fetchData() {
      if (wallet) {
        setAttester((await wallet.getAddress()).toLowerCase())
      }

      if (eas && eventData) {
        setAttestation(await createAndSignOffchainAttestation(
          eas,
          // Use EAS wallet, which is a bare ethers v6 wallet.
          eas.getWallet(), 
          eventData
        ))
      }
    }

    fetchData();
  }, [wallet, eas, eventData]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent default submit 
    event.preventDefault()

    // Prevent double submit
    if (submitting) {
      return
    }

    // Provide user feedback
    setSubmitting(true)

    // Submit the form programmatically
    const form = event.currentTarget.form?.requestSubmit()

    // Reset state
    setAttester(null)
    setAttestation(null)
    setSubmitting(false)
  }

  const buttonProps = {
    onClick: handleClick,
    disabled: (pending || submitting || !attestation)
  }

  return (
    <>
      {typeof children === 'function' ?
        children({
          user,
          wallet,
          buttonProps,
        }) : (
          <Button
            className="relative inline-flex gap-2"
            type="submit"
            {...buttonProps}
          >
            {children}
          </Button>
        )
      }
      <AttestationFormFields attester={attester} attestation={attestation} />
    </>
  )
}