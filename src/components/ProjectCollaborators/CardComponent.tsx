"use client";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProjectMetaDataDialog from "../ProjectMetaDataTable/ProjectMetaDataDialog";
import CardMainData from "./CardMainData";
import { CardProps, ProjectUserProps } from "./types";
import { ProjectInvitationProps } from "../ProjectMetaDataTable";

const isInvitation = (obj: ProjectUserProps | ProjectInvitationProps) =>
  !!(obj as any)?.status;

const CardComponent: React.FC<CardProps> = ({ data, allData, project }) => {
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
          <div>{data.user_name || "Username"}</div>
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
              onClick={() => handleActionClick(data.user_id, "", "create")}
            >
              +
            </button>
          </div>
        </div>
      </div>
      {data?.roles?.find((role: any) => role) && (
        <CardMainData data={data} handleActionClick={handleActionClick} />
      )}

      <ProjectMetaDataDialog
        open={editModal}
        setOpen={setEditModal}
        request={requestType}
        roleId={roleId}
        project={project}
        selectedUser={allData.find(
          (v: ProjectUserProps) => v.user_id === selectedUserId
        )}
      />
    </div>
  );
};

export default CardComponent;
