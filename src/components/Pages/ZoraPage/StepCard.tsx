import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function StepCard({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Card>) {
  return (
    <Card className={cn("w-full p-6", className)} {...props}>
      <div className="flex flex-col items-center md:items-stretch gap-8 md:flex-row md:gap-12">
        {children}
      </div>
    </Card>
  );
}
