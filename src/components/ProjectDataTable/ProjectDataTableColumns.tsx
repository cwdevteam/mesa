import { IS_TESTNET } from "@/lib/consts";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import Description from "./Description";

export const columns: ColumnDef<any>[] = [
  {
    id: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.original[0].value.value;
      const uid = row.original[5].value.value[0];
      return (
        <Link href={`/project/${uid}`} className="underline">
          {title}
        </Link>
      );
    },
  },
  {
    id: "description",
    header: "Description",
    cell: ({ row }) => {
      return <Description row={row} />;
    },
  },
  {
    id: "uid",
    header: "Project ID",
    cell: ({ row }) => {
      const uid = row.original[5].value.value[0];
      return (
        <a
          href={`https://base${
            IS_TESTNET ? "-sepolia" : ""
          }.easscan.org/attestation/view/${uid}`}
          target="_blank"
        >
          <p className="truncate underline">{`${uid.substring(
            0,
            5
          )}...${uid.substring(uid.length - 4)}`}</p>
        </a>
      );
    },
  },
];
