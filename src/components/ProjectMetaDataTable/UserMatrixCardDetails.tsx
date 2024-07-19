import React from "react";
import { Icons } from "../Icons";
import { Credit } from "@/types/projectMetadataForm";
import bpsToPercent from "@/lib/bpsToPercent";

const UserMatrixCardDetails = ({
  data,
  handleActionClick,
}: {
  data: Credit;
  handleActionClick: Function;
}) => (
  <div className="w-full rounded-md overflow-hidden shadow-lg border">
    <div className="w-full overflow-x-auto">
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
                {data?.collaboratorType}
              </div>
            </th>
            <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
              <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                {bpsToPercent(data?.splitBps)}%
              </div>
            </th>
            <th className="h-10 px-2 sm:px-0 text-center cursor-pointer align-middle font-medium text-muted-foreground">
              <div className=" inline-flex justify-center items-center mt-1 text-center">
                <Icons.delete />
              </div>
            </th>
            <th className="h-10 px-2 sm:px-0 text-center cursor-pointer flex flex-row justify-center items-center align-middle font-medium text-muted-foreground">
              <div
                className=" inline-flex justify-center items-center text-center"
                onClick={() => handleActionClick()}
              >
                <Icons.Edit />
              </div>
            </th>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

export default UserMatrixCardDetails;
