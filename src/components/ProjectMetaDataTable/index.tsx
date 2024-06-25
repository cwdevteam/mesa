"use client";
import { Button } from "@/components/ui/button";

import { useEffect, useState } from "react";
import ProjectMetaDataDialog from "./ProjectMetaDataDialog";
import ProjectColumns from "./ProjectColumns";
import {
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { getColumns } from "./columns";

export type ProjectUserProps = any;
export type ProjectInvitationProps = any;
export type ProjectType = any;
export type User = any;

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

  const columns = getColumns(user, handleActionClick, project);

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
      <ProjectColumns
        handleActionClick={handleActionClick}
        user={user}
        data={data}
        project={project}
        rows={rows}
      />
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
