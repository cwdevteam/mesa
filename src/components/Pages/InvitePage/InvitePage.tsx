"use client";

import Image from "next/image";
import InvitePageButtons from "./InvitePageButtons";

const InvitePage = () => (
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
        <span className="text-blue-700">Invitooor</span> invited you to
        collaborate
      </div>
      <InvitePageButtons />
    </div>
  </main>
);

export default InvitePage;
