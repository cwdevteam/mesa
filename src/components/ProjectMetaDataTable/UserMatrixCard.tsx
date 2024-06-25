import React from 'react';

import { Icons } from '../Icons';
import { UserMatrixCardProps } from '@/types/const';

const UserMatrixCard: React.FC<UserMatrixCardProps> = ({ data }) => {
  return (
    <div className="w-auto rounded-md overflow-hidden shadow-lg border">
      <div className="px-6 py-4 flex">
        <div className="font-bold w-screen text-lg flex ml-6 items-center">
          <div>{data?.name}</div>
          <div className="text-sm w-full ml-17 flex justify-end">
            <button className="inline-flex items-center justify-center whitespace-nowrap text-md font-x1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full">
              +
            </button>
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full caption-bottom text-sm">
          <thead className="[&amp;_tr]:border-b">
            <tr className="border-b transition-colors hover:bg-muted/50">
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  Contract Type
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  Role
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  Splits
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="hidden sm:block text-center">Delete</div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className=" hidden sm:block text-center">Edit</div>
              </th>
            </tr>
          </thead>
          <tbody className="[&amp;_tr:last-child]:border-0">
            <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  {data?.contractType}
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  {data?.role}
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  {data?.bps}
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-center cursor-pointer align-middle font-medium text-muted-foreground">
                <div className=" inline-flex justify-center items-center mt-1 text-center">
                  <Icons.delete />
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-center cursor-pointer flex flex-row justify-center items-center align-middle font-medium text-muted-foreground">
                <div className=" inline-flex justify-center items-center text-center">
                  <Icons.Edit />
                </div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserMatrixCard;
