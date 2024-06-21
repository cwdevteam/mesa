import { cn } from "@/lib/utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { toast } from "../ui/use-toast";

type ProjectType = any;

type PopUpProps = React.HTMLAttributes<HTMLDivElement> & {
  project?: ProjectType;
  setContractId: (contractId?: string) => void;
  setContractTime: (contractTime: Date) => void;
  onMakeContract: () => void;
};

const PopUp = ({
  children,
  className,
  project,
  setContractId,
  setContractTime,
  onMakeContract: handleMakeContract,
  ...props
}: PopUpProps) => {
  const [isLoadingContract, setIsLoadingContract] = useState<boolean>(false);

  const onMakeContract = async () => {
    if (!project?.projectUsers) return;

    toast({
      title: `Warning! Please check profile`,
      description: "LegalName is mandatory",
      variant: "destructive",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className={cn("grid gap-8 max-w-md px-8 py-16", className)}
        {...props}
      >
        <DialogHeader>
          <div className="text-md text-center">DISCLAIMER</div>
          <div className="text-sm pt-3 text-muted-foreground">
            Our intention is to provide a platform for legal information and
            self-help. The information given in this service is provided for
            your private use and does not constitute legal advice. We do not
            review any information you provide us for legal accuracy or
            sufficiency, draw legal conclusions, provide opinions about your
            usage, or apply the law to the facts of your situation.
          </div>
          <div className="text-sm pt-3 text-muted-foreground">
            If you need legal advice for a specific problem, you should consult
            with a licensed attorney. Legal information provided by this service
            is not a substitute for legal advice from a qualified attorney
            licensed to practice in an appropriate jurisdiction.
          </div>
        </DialogHeader>
        <div className="w-full flex justify-center items-center">
          <Button variant="outline" onClick={onMakeContract}>
            {isLoadingContract ? "Please wait ..." : "Accept"}
          </Button>
          <DialogClose>
            <Button variant="outline" className="ml-14">
              Reject
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PopUp;
