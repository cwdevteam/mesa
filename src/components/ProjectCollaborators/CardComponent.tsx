"use client";
import { useState } from "react";
import { FileIcon, TrashIcon } from "@radix-ui/react-icons";
import { bpsToPercent } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import ProjectMetaDataDialog from "../ProjectMetaDataTable/ProjectMetaDataDialog";

interface ProjectUserProps {
  user_id: string;
  user_name: string;
}

interface Role {
  id: string;
  contract_type: string;
  user_role: string;
  user_bps?: number;
}

interface ProjectType {
  projectUsers: ProjectUserProps[];
}

export interface CardProps {
  data: any;
  allData: ProjectUserProps[];
  project?: ProjectType;
}

interface ProjectInvitationProps {}
const isInvitation = (obj: ProjectUserProps | ProjectInvitationProps) =>
  !!(obj as any)?.status;

const CardComponent: React.FC<CardProps> = ({ data, allData, project }) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<string>("");
  const [roleId, setRoleId] = useState<string>("");

  console.log(data, "wedrfghjkjhgfdgfhjk");

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
      {data?.roles?.find((role: any) => role) ? (
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
      ) : (
        <></>
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
