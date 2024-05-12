import { InvoiceWithOrderUserAndPayment } from "@/types";
import { format } from "date-fns";
import React from "react";

interface TableInvoiceCreatedAtCellProps {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TableInvoiceCreatedAtCell({
  rowDataWhichIsInvoice,
}: TableInvoiceCreatedAtCellProps) {
  return (
    <>
      <div>{format(rowDataWhichIsInvoice.created_at!, "yyyy MMM dd")}</div>
      <div className="text-muted-foreground">
        {format(rowDataWhichIsInvoice.created_at!, "hh:MM aaaa")}
      </div>
    </>
  );
}
