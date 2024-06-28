import React from "react";

import { Button } from "@/components/ui/button";
import { ContractDetailsPageProps } from "@/types/const";
import ContractHistoryTable from "../Project/ContractHistoryTable";

const ContractDetailsPage = ({
  project,
  contractId,
  contractTime,
  contractHistories,
}: ContractDetailsPageProps) => {
  return (
    <div className="w-full">
      <div className="text-center text-2xl font-bold w-full">
        {project?.name}
      </div>
      <div className="text-center">{project?.description}</div>
      {contractId ? (
        <div className="flex flex-col justify-center pt-10 items-center gap-4">
          <span>
            Contract created at{" "}
            <span className="font-bold">
              {contractTime && new Date(contractTime).toLocaleString()}{" "}
            </span>
          </span>
          <Button>Download Signed Document</Button>
          <div className="w-full flex justify-center max-w-3xl pt-6">
            <ContractHistoryTable contractHistories={contractHistories!} />
          </div>
        </div>
      ) : (
        <div className="text-center mt-5">Contract has not started yet</div>
      )}
    </div>
  );
};

export default ContractDetailsPage;
