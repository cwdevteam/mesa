import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { bpsToPercent } from "@/lib/utils";
import ProjectMetaDataDialog from "./ProjectMetaDataDialog";
import { useEffect, useState } from "react";
import { InvitaionNav } from "./InvitaionNav";
import CardComponent from "./CardComponent";
import {
  ProjectInvitationProps,
  ProjectType,
  ProjectUserProps,
} from "@/components/ProjectCollaborators/types";
import { User } from "@/components/Project/types";

const isInvitation = (obj: ProjectUserProps | ProjectInvitationProps) =>
  !!(obj as any)?.status;

export const ProjectMetaDataTable = ({
  project,
  data,
  user,
  invitations,
}: {
  project?: ProjectType;
  data: ProjectUserProps[];
  user: User;
  invitations: ProjectInvitationProps[];
}) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [editModal, setEditModal] = useState<boolean>(false);
  const [rows, setRows] = useState<
    (ProjectUserProps | ProjectInvitationProps)[]
  >([]);
  const handleActionClick = (userId: string) => {
    setSelectedUserId(userId);
    setEditModal(true);
  };

  const columns: ColumnDef<ProjectUserProps | ProjectInvitationProps>[] = [
    {
      id: "user_name",
      header: "Shareholder",
      cell: ({ row }) => <p>{row.original.name}</p>,
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
      cell: ({ row }) => <p>{row.original.role}</p>,
    },
    {
      id: "user_bps",
      header: "%",
      cell: ({ row }) => (
        <span>{bpsToPercent(row.original.user_bps ?? 0)}</span>
      ),
    },
    {
      id: "info",
      header: "Info",
      cell: ({ row }) => {
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
                {project?.created_by === user.id ? (
                  <InvitaionNav
                    userId={row.original.user_id}
                    invitationId={row.original.id}
                  />
                ) : null}
              </>
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    setRows([
      ...data,
      ...invitations
        .filter((item) => item.status === "Pending")
        .map((obj) => ({
          ...obj,
          user_name: obj.user_name ?? obj.user_email?.split("@")[0],
        })),
    ]);
  }, [data, invitations]);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        {table.getRowModel().rows.length ? (
          table
            .getRowModel()
            .rows.map((row) => (
              <CardComponent
                key={row.id}
                data={row.original}
                allData={data}
                project={project}
              />
            ))
        ) : (
          <></>
        )}
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <ProjectMetaDataDialog
        open={editModal}
        setOpen={setEditModal}
        selectedUser={
          data.find((v: ProjectUserProps) => v.user_id === selectedUserId)!
        }
      />
    </div>
  );
};
