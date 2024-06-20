import Link from "next/link";

import { getUser, useSupabase } from "@/lib/supabase/server";
import { Dictionary } from "@/dictionaries/types";
import { Locale } from "@/../i18n.config";

import { ThemeToggle } from "@/components/ThemeToggle";
import { Logo } from "@/components/Logo";
import { SignOutButton } from "@/components/SignOutButton";
import { UserNav } from "@/components/UserNav";

export default async function Header({
  lang,
  dict,
}: {
  lang: Locale;
  dict: Dictionary;
}) {
  const supabase = useSupabase();
  const user = await getUser(supabase);

  return (
    <header className="flex border-b border-foreground/20">
      <div className="flex container mx-auto py-4">
        <Link className="flex items-center gap-2" href="/">
          <Logo className="h-6 w-auto" />
        </Link>
        <div className="flex gap-4 ml-auto">
          <ThemeToggle />
          {user && (
            <UserNav user={user} lang={lang} dict={dict.auth.signOutButton} />
          )}
        </div>
      </div>
    </header>
  );
}
