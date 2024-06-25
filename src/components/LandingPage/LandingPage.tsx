"use client";

import env from "@/env";
import { useAccount } from "wagmi";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import LoginButton from "../LoginButton";

const LandingPage = ({ dict }: any) => {
  const { isConnected } = useAccount();
  const { push } = useRouter();

  useEffect(() => {
    if (isConnected) {
      push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected]);

  return (
    <main className="grid gap-6 sm:gap-12 md:gap-24">
      <div className="grid grid-rows-[1fr_auto_2fr]">
        <section className="row-start-2 grid gap-4 place-items-center container w-fit p-8">
          <h1 className="text-4xl font-medium tracking-tight">
            {dict.welcome}
          </h1>
          <LoginButton />
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
