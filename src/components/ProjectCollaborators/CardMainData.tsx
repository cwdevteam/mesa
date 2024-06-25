import { bpsToPercent } from "@/lib/utils";
import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import React, { FC } from "react";

const CardMainData: FC<{
  data: any;
  handleActionClick: (userId: string, roleId: string, request: string) => void;
}> = ({ data, handleActionClick }) => {
  return (
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
              <div className="hidden sm:block text-center">Edit</div>
            </th>
          </tr>
        </thead>
        <tbody className="[&amp;_tr:last-child]:border-0">
          {data?.roles?.map((role: any) => (
            <tr
              key={role.id}
              className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            >
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  {role.contract_type === "Both"
                    ? "Master&SongWriter"
                    : role.contract_type}
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  {role.user_role}
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-left align-middle font-medium text-muted-foreground">
                <div className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors h-9 px-4 py-2">
                  {bpsToPercent(role.user_bps ?? 0)}
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-center cursor-pointer align-middle font-medium text-muted-foreground">
                <div className="inline-flex justify-center items-center mt-1 text-center">
                  <TrashIcon />
                </div>
              </th>
              <th className="h-10 px-2 sm:px-0 text-center cursor-pointer flex flex-row justify-center items-center align-middle font-medium text-muted-foreground">
                <div
                  className="inline-flex justify-center items-center text-center"
                  onClick={() =>
                    handleActionClick(data.user_id, role.id, "edit")
                  }
                >
                  <FileIcon />
                </div>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CardMainData;
