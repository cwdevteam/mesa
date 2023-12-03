'use client'

import { ColumnDef, flexRender, getCoreRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableRow } from "@/components/ui/table"
import Link from "next/link"
import { DateFormat, DateFormatProps } from "@/components/DateFormat"
import { useLocale } from "@/context/LocaleContext"

// Define the data typeV
type Project = {
  id: string;
  title: string;
  description: string | null;
  created_by: string | null;
  created_at: string | null;
  updated_at: string | null;
}


function DateFormatWithLang({date}: Omit<DateFormatProps, 'lang'>) {
  const lang = useLocale();
  return <DateFormat date={date} lang={lang} />; 
}

// Define the columns
const columns: ColumnDef<Project>[] = [
  {
    id: "title",
    header: "Title",
    cell: ({ row }) => (
      <Link href={`/project/${row.original.id}`} className="underline">
        {row.original.title}
      </Link>
    ),
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => <p className="truncate">{row.original.description}</p>,
  },
  {
    id: "updated_at",
    header: "Last Updated",
    cell: ({ row }) => {
      return <DateFormatWithLang date={row.original.updated_at!} />;
    },
  }
]

// Define the DataTable component
export const ProjectDataTable = ({ data }: { data: Project[] }) => {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  })

  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="rounded-md border col-span-full">
        <Table className="table-fixed w-full">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead key={header.id} className={ index === 0 ? 'w-[160px]': ''}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())
                    }
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </thead>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row, index) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
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
    </div>
  )
}
