import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { isInvitation } from "./utils";
import { bpsToPercent } from "@/lib/utils";
import { InvitationNav } from "../ProjectCollaborators/InvitationNav";
import { Project, ProjectUser } from "../Project/types";

const InfoCell = ({
  row,
  user,
  project,
  handleActionClick,
}: {
  row: any;
  user: any;
  project?: Project;
  handleActionClick: (userId: string) => void;
}) => {
  const flag =
    !isInvitation(row.original) &&
    (project?.created_by === user.id || row.original.user_id === user.id);
  return (
    <>
      {flag ? (
        <span
          className="cursor-pointer select-none"
          onClick={() => {
            flag && handleActionClick(row.original.user_id);
          }}
        >
          ...
        </span>
      ) : (
        <>
          {project?.created_by === user.id && (
            <InvitationNav
              userId={row.original.user_id}
              invitationId={row.original.id}
            />
          )}
        </>
      )}
    </>
  );
};

export const getColumns = (
  user: ProjectUser,
  handleActionClick: (userId: string) => void,
  project?: Project
): ColumnDef<any>[] => [
  {
    id: "user_name",
    header: "Shareholder",
    cell: ({ row }) => <p>{row.original.user_name}</p>,
  },
  {
    id: "user_type",
    header: "Type",
    cell: ({ row }) => <p>{row.original.contract_type}</p>,
  },
  {
    id: "status",
    header: "Status",
    cell: ({ row }) => (
      <p>{isInvitation(row.original) ? "pending" : "active"}</p>
    ),
  },
  {
    id: "user_role",
    header: "Role",
    cell: ({ row }) => <p>{row.original.user_role}</p>,
  },
  {
    id: "user_bps",
    header: "%",
    cell: ({ row }) => <span>{bpsToPercent(row.original.user_bps ?? 0)}</span>,
  },
  {
    id: "info",
    header: "Info",
    cell: ({ row }) => (
      <InfoCell
        row={row}
        user={user}
        project={project}
        handleActionClick={handleActionClick}
      />
    ),
  },
];
