'use client'

import React, { useEffect, useState } from 'react';
import { useFormStatus } from "react-dom"
import { useWallet } from "@thirdweb-dev/react"
import { PlusCircledIcon } from "@radix-ui/react-icons"
import { SignedOffchainAttestation } from '@ethereum-attestation-service/eas-sdk';
import { User } from "@supabase/supabase-js"

import { Icons } from "@/components/Icons"
import { Button } from "@/components/ui/button"
import { Dictionary } from "@/dictionaries/types"

import { 
  createClientWithMesaWallet,
  createAndSignOffchainAttestation 
} from "@/lib/eas/client"
import { serialize } from 'superjson';
import { MesaProjectCreateEvent } from '@/types/mesa';

function AttestationFields({
  attester,
  attestation,
}: {
  attester: string | null,
  attestation: SignedOffchainAttestation | null
}) {
  if (!attester || !attestation) {
    return 
  }

  const { json, meta } = serialize(attestation)
  
  return (
    <>
      <input type="hidden" name="attester" value={attester} />
      <input type="hidden" name="attestation" value={JSON.stringify(json)} />
      <input type="hidden" name="attestationMeta" value={JSON.stringify(meta)} />
    </>
  )
}

export default function NewProjectButtonFormChildren({
  dict,
  user
}: {
  dict: Dictionary['dashboard']['newProjectButton'],
  user: User
}) {
  const { pending } = useFormStatus()

  const wallet = useWallet()

  const [attester, setAttester] = useState<string | null>(null)
  const [attestation, setAttestation] = useState<SignedOffchainAttestation | null>(null);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    async function fetchData() {
      if (!user || !wallet) {
        return
      }
      
      const eventData: MesaProjectCreateEvent = {
        type: 'mesa.project.create',
        user_id: user.id,
        project_id: self.crypto.randomUUID()
      }

      const eas = await createClientWithMesaWallet(wallet)
      setAttester((await wallet.getAddress()).toLowerCase())
      setAttestation(await createAndSignOffchainAttestation(
        eas, 
        eas.getWallet(), 
        eventData
      ))
    }

    fetchData();
  }, [wallet, user, toggle]);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // Submit the form programmatically
    const form = event.currentTarget.form;
    if (form) {
      form.requestSubmit();
    }

    setAttester(null)
    setAttestation(null)
    setToggle(!toggle)
  }

  return (
    <>
      <Button 
        className="inline-flex gap-2"
        onClick={handleClick} 
        disabled={pending || !attestation}
        type="submit"
      >
        {pending ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <PlusCircledIcon color="currentColor" className="h-4 w-4" />
        )}{" "}
        {dict.buttonLabel}
      </Button>
      <AttestationFields attester={attester} attestation={attestation} />
    </>
  )
}
