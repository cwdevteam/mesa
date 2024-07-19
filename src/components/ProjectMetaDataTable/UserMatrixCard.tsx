"use client";

import { useState } from "react";
import { UserMatrixCardProps } from "@/types/const";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProjectMetaDataDialog from "./ProjectMetaDataDialog";
import UserMatrixCardDetails from "./UserMatrixCardDetails";
import { isInvitation } from "./utils";

const UserMatrixCard: React.FC<UserMatrixCardProps> = ({ data }) => {
  const [editModal, setEditModal] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  const handleActionClick = (roleId: string, request: string) => {
    setRequestType(request);
    setRoleId(roleId);
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
              onClick={() => handleActionClick("ididid", "create")}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <UserMatrixCardDetails
        handleActionClick={handleActionClick}
        data={data}
      />
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
