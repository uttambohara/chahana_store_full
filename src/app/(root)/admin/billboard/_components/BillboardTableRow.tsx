import TableDeleteButton from "@/components/Table/TableDeleteButton";
import { TableCell, TableRow } from "@/components/ui/table";
import { Tables } from "@/types/supabase";
import Image from "next/image";

interface BillboardTableRowProps {
  billboard: Tables<"billboard">;
}
export default function BillboardTableRow({
  billboard,
}: BillboardTableRowProps) {
  return (
    <TableRow key={billboard.id}>
      <TableCell>
        <div className="h-16 w-16 relative rounded-md">
          <Image
            src={billboard.image_url}
            alt={billboard.name}
            fill
            priority
            className="object-cover"
          />
        </div>
      </TableCell>
      <TableCell className="font-medium">{billboard.name}</TableCell>
      <TableCell>
        <TableDeleteButton deleteBy={"billboard"} id={billboard.id} />
      </TableCell>
    </TableRow>
  );
}
