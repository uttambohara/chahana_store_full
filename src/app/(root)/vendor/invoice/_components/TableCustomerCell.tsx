import { InvoiceWithOrderUserAndPayment } from "@/types";
import Image from "next/image";

interface TableCustomerCellProps {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TableCustomerCell({
  rowDataWhichIsInvoice,
}: TableCustomerCellProps) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative h-12 w-12">
          <Image
            src={rowDataWhichIsInvoice.customer?.users?.avatar_url as string}
            alt={rowDataWhichIsInvoice.customer?.users?.first_name as string}
            fill
            priority
            className="rounded-full object-cover"
          />
        </div>
        <div>
          <div className="font-bold">
            {rowDataWhichIsInvoice.customer?.users?.first_name}{" "}
            {rowDataWhichIsInvoice.customer?.users?.last_name}
          </div>
          <div className="text-muted-foreground">
            INV-
            {rowDataWhichIsInvoice.id}
          </div>
        </div>
      </div>
    </div>
  );
}
