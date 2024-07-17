"use client";

import { useAccount } from "wagmi";
import ConnectButton from "../ConnectButton";

const LandingPage = ({ dict }: any) => {
  const { address } = useAccount();
  return (
    <main className="grid gap-6 sm:gap-12 md:gap-24">
      <div className="grid grid-rows-[1fr_auto_2fr]">
        <section className="row-start-2 grid gap-4 place-items-center container w-fit p-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium tracking-tight">
            {dict.welcome}
          </h1>
          {!address && <ConnectButton showTextInMobile={false} />}
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
