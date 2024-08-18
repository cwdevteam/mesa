import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ContractHistoryTable: React.FC = () => {
  const contractHistories = [
    {
      projectUser: { user_name: "User new name" },
      created_at: "10-02-2024",
    },
  ];

  return (
    <Table>
      <TableCaption>
        {contractHistories.length ? "List of Signers" : "No signer yet"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Collaborator</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contractHistories.map((history, id: number) => (
          <TableRow key={id.toString()}>
            <TableCell>{history.projectUser?.user_name}</TableCell>
            <TableCell>
              Signed at {new Date(history.created_at).toLocaleString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ContractHistoryTable;
