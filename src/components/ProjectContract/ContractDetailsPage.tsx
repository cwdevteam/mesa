import React from 'react';

import { Button } from '@/components/ui/button';
import { ContractDetailsPageProps } from '@/types/const';

const ContractDetailsPage = ({ project, contractId }: ContractDetailsPageProps) => {
  return (
    <div className="w-full">
      <div className="text-center text-2xl font-bold w-full"></div>
      <div className="text-center">{project?.description}</div>
      {contractId ? (
        <div className="flex flex-col justify-center pt-10 items-center gap-4">
          <span>Contract created at </span>
          <Button onClick={() => {}}>Download Signed Document</Button>
        </div>
      ) : (
        <div className="text-center mt-5">Contract has not started yet</div>
      )}
    </div>
  );
};

export default ContractDetailsPage;
