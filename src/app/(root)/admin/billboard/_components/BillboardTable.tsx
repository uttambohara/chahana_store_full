import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAllBillboards } from "@/utils/query/supabase-database";
import BillboardTableRow from "./BillboardTableRow";
import { toast } from "sonner";

export default async function BillboardTable() {
  const { billboards, error } = await getAllBillboards();
  if (error) {
    toast.message(JSON.stringify(error));
  }
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">Image</TableHead>
          <TableHead className="w-[150px]">Name</TableHead>
          <TableHead className="w-[100px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {billboards?.map((billboard) => (
          <BillboardTableRow key={billboard.id} billboard={billboard} />
        ))}
      </TableBody>
    </Table>
  );
}
