"use client";
import React, { useState } from "react";

import { Icons } from "../Icons";
import { UserMatrixCardProps } from "@/types/const";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProjectMetaDataDialog from "./ProjectMetaDataDialog";

interface ProjectInvitationProps {}
const isInvitation = (obj: UserMatrixCardProps | ProjectInvitationProps) =>
  !!(obj as any)?.status;

const UserMatrixCard: React.FC<UserMatrixCardProps> = ({ data }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const handleActionClick = (
    userId: string,
    roleId: string,
    request: string
  ) => {
    setRequestType(request);
    setRoleId(roleId);
    setSelectedUserId(userId);
    setEditModal(true);
  };

  return (
    <div className="w-full rounded-md overflow-hidden shadow-lg border  my-4">
      <div className="px-6 py-4 flex w-full">
        <Avatar className="h-7 w-7">
          <AvatarImage
            src={`https://avatar.vercel.sh/${"user?.id"}.svg`}
            alt="avatar"
          />
          <AvatarFallback> ME</AvatarFallback>
        </Avatar>
        <div className="font-bold w-full text-lg flex ml-6 items-center">
          <div>{data.name || "Username"}</div>
          <div>
            {isInvitation(data) === false ? (
              <div className="ml-3 w-3 h-3 bg-green-600 rounded-md"></div>
            ) : (
              <div className="ml-3 w-3 h-3 bg-red-600 rounded-md"></div>
            )}
          </div>
          <div className="text-sm w-full ml-17 flex justify-end">
            <button
              className="inline-flex items-center justify-center whitespace-nowrap text-md font-x1 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 shrink-0 rounded-full"
              onClick={() => handleActionClick(data.bps, "create")}
            >
              +
            </button>
          </div>
        </div>
      </div>
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
      <ProjectMetaDataDialog
        open={editModal}
        setOpen={setEditModal}
        request={requestType}
        roleId={roleId}
        project={data}
      />
    </div>
  );
};

export default UserMatrixCard;
