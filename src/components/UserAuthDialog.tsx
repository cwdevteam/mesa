import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { cn } from "@/lib/utils"
import env from "@/env"
import EmailAuthForm from "@/components/EmailAuthForm"
import SocialAuthForm from "@/components/SocialAuthForm"
import { getDictionary } from "@/lib/dictionary"
import { Locale } from "@/../i18n.config"

type UserAuthDialogProps = React.HTMLAttributes<HTMLDivElement> & {
  lang: Locale
}

export default async function UserAuthDialog({ lang, children, className, ...props }: UserAuthDialogProps) {
  const { auth: {userAuthDialog: dict } } = await getDictionary(lang)
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={cn("grid gap-8 max-w-sm px-8 py-16", className)} {...props}>
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold tracking-tight text-center">
            {env.NEXT_PUBLIC_SIGNUPS_OPEN ? dict.titleOpen : dict.titleClosed}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground text-center">
            {dict.description}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-6">
          <div className="grid gap-2 max-w-full">
            <EmailAuthForm />
          </div>
          {env.NEXT_PUBLIC_OAUTH_PROVIDERS && (
            <>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    {dict.orContinueWith}
                  </span>
                </div>
              </div>
              <div className="grid gap-1">
                <SocialAuthForm />
              </div>
            </>
          )}
        </div>
        {(env.NEXT_PUBLIC_TOS_URL || env.NEXT_PUBLIC_PP_URL) && (
          <p className="px-8 text-center text-sm text-muted-foreground">
            {dict.agreementText}{" "}
            {env.NEXT_PUBLIC_TOS_URL && (
              <a
                href={env.NEXT_PUBLIC_TOS_URL}
                className="underline underline-offset-4 hover:text-primary"
                rel="noreferrer noopener"
                target="_blank"
              >
                {dict.termsOfService}
              </a>
            )}
            {env.NEXT_PUBLIC_TOS_URL && env.NEXT_PUBLIC_PP_URL && (
              <>{" "}{dict.and}{" "}</>
            )}
            {env.NEXT_PUBLIC_PP_URL && (
              <a
                href={env.NEXT_PUBLIC_PP_URL}
                className="underline underline-offset-4 hover:text-primary"
                rel="noreferrer noopener"
                target="_blank"
              >
                {dict.privacyPolicy}
              </a>
            )}
            .
          </p>
        )}
      </DialogContent>
    </Dialog>
  )
}
