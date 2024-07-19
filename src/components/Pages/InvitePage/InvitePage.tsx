"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

export default function Invite() {
  const { toast } = useToast();

  const handleSubmit = async (state: string) => {
    try {
      toast({
        title: "Success",
        description: "Accepted Invitation",
        variant: "default",
      });
    } catch (err: any) {
      console.error(err);
      toast({
        title: "Error",
        description: "Something went wrong",
        variant: "destructive",
      });
    }
  };

  return (
    <main className="container py-10 h-full flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-5">
        <Image
          src="https://d34u8crftukxnk.cloudfront.net/slackpress/prod/sites/6/M2A2H%402x.jpg?d=500x500&f=inside"
          alt=""
          width={150}
          height={150}
          className="rounded-full object-cover w-[150px] h-[150px] bg-cyan-100"
        />
        <div className="text-2xl font-bold text-center">
          <a href={`mailto:sweetmantech@gmail.com`} className="text-blue-700">
            Invitooor
          </a>{" "}
          invited you to collaborate
        </div>
        <div className="flex items-center justify-center gap-4">
          <Button
            className="bg-green-600 px-4 py-3 hover:bg-green-700"
            onClick={() => handleSubmit("accept")}
          >
            Accept invitation
          </Button>
          <Button
            className="bg-zinc-100 text-black border-2 border-zinc-200 hover:bg-zinc-200"
            onClick={() => handleSubmit("decline")}
          >
            Decline
          </Button>
        </div>
        <div className="text-center">
          Is this user sending spam or malicious content? You can{" "}
          <a href={`mailto:sweetmantech@gmail.com`} className="text-blue-800">
            block Invitoor
          </a>
        </div>
      </div>
    </main>
  );
}
