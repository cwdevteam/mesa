import React, { useState } from 'react';

import UserMatrixCard from './ProjectMetaDataTable/UserMatrixCard';
import { Button } from './ui/button';
import { ProjectCollaboratorsProps, UserData } from '@/types/const';


export function ProjectCollaborators({ project }: ProjectCollaboratorsProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;
  const totalPages = Math.ceil((project?.collaborators.length || 0) / itemsPerPage);

  const handleNext = () => {
    setCurrentPage(prevPage => Math.min(prevPage + 1, totalPages - 1));
  };

  const handlePrevious = () => {
    setCurrentPage(prevPage => Math.max(prevPage - 1, 0));
  };

  const currentCollaborators = project?.collaborators.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  ) as UserData[];

  return (
    <section className="grid mt-4 max-w-auto">
      <h3 className="text-lg font-bold tracking-tight">Collaborators</h3>
      <div className="flex items-center gap-2 justify-end mb-2">
        <Button
          variant="outline"
          className="text-sm rounded-full px-[13px] py-2 sm:rounded-md sm:px-4 sm:py-2"
        >
          +<span className="hidden sm:block">&nbsp;Add Collaborator</span>
        </Button>
      </div>
      <div className="flex flex-wrap overflow-auto text-muted-foreground text-xs">
        <div className="grid grid-cols-1 gap-4">
          {currentCollaborators.map((collaborator, index) => (
            <UserMatrixCard key={index} data={collaborator} />
          ))}
        </div>
        <div className="flex justify-between w-full mt-3 mb-4">
          <Button variant="outline" size="sm" onClick={handlePrevious} disabled={currentPage === 0}>
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </section>
  );
}
