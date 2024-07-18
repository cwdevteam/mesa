import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Component({
  children,
  ...props
}: React.ComponentProps<typeof Link>) {
  return (
    <Button asChild>
      <Link {...props} prefetch={false} target="_blank">
        {children}
        <ExternalLinkIcon className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  );
}

function ExternalLinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
}
