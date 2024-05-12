import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";

export default function NotFoundContainer({ message }: { message: string }) {
  return (
    <TableRow>
      <TableCell className="p-4 text-muted-foreground">{message}</TableCell>
    </TableRow>
  );
}
