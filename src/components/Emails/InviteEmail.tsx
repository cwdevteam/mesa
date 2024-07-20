import * as React from "react";
import { Address } from "viem";

interface InviteEmailProps {
  name: string;
  message?: string;
  referenceAttestation: Address;
}

export const InviteEmail: React.FC<Readonly<InviteEmailProps>> = ({
  name,
  message = "",
  referenceAttestation,
}) => (
  <div>
    <h1>Welcome, {name}!</h1>
    <h3>You&apos;ve been invited to join a Mesa project.</h3>
    <h3>Message: {message}</h3>
    <div>
      View the invitation:{" "}
      <a
        href={`https://mesa-wallet.vercel.app/invite/${referenceAttestation}`}
        target="_blank"
      >
        here
      </a>
    </div>
    {/* eslint-disable-next-line @next/next/no-img-element */}
    <img
      src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/M2A2H%402x.jpg?d=500x500&f=inside"
      alt=""
      width={150}
      height={150}
      className="rounded-full object-cover w-[150px] h-[150px] bg-cyan-100"
    />
  </div>
);
