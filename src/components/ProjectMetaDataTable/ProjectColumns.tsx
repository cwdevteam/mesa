import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { ProjectInvitationProps, ProjectType, ProjectUserProps, User } from ".";
import CardComponent from "../ProjectCollaborators/CardComponent";
import { getColumns } from "./columns";

const ProjectColumns = ({
  rows,
  data,
  project,
  user,
  handleActionClick,
}: {
  user: User;
  rows: (ProjectUserProps | ProjectInvitationProps)[];
  project?: ProjectType;
  data: ProjectUserProps[];
  handleActionClick: (userId: string) => void;
}) => {
  const columns = getColumns(user, handleActionClick, project);

  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      {table.getRowModel().rows.length &&
        table
          .getRowModel()
          .rows.map((row) => (
            <CardComponent
              key={row.id}
              data={row.original}
              allData={data}
              project={project}
            />
          ))}
    </div>
  );
};

export default ProjectColumns;
