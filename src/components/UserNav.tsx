import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "@/lib/supabase/createUser/actions";
import { User } from "@supabase/supabase-js";
import { Locale } from "@/../i18n.config";
import { Dictionary } from "@/dictionaries/types";

export function UserNav({
  user,
  lang,
  dict,
}: {
  user: User;
  lang: Locale;
  dict: Dictionary["auth"]["signOutButton"];
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-9 w-9 rounded-full">
          <Avatar className="h-7 w-7">
            <AvatarImage
              src={`https://avatar.vercel.sh/${user.id}.svg`}
              alt="avatar"
            />
            <AvatarFallback>
              {user.email ? user.email.slice(0, 2).toUpperCase() : "ME"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-xs leading-none text-muted-foreground">
              {user.email ?? user.id}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <form action={signOut.bind(null, lang)}>
            <button className="grow text-left" type="submit">
              {dict.buttonLabel}
            </button>
          </form>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
