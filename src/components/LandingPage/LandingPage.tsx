"use client";

import env from "@/env";
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
          {!env.NEXT_PUBLIC_SIGNUPS_OPEN && (
            <p className="text-sm text-muted-foreground text-center max-w-[18em]">
              {dict.accessLimited}
              {env.NEXT_PUBLIC_ACCESS_FORM_URL && (
                <>
                  <br />
                  <br />
                  <a
                    href={env.NEXT_PUBLIC_ACCESS_FORM_URL}
                    className="underline underline-offset-4 hover:text-primary"
                    rel="noreferrer noopener"
                    target="_blank"
                  >
                    {dict.signUp}
                  </a>
                </>
              )}
            </p>
          )}
        </section>
      </div>
    </main>
  );
};

export default LandingPage;
