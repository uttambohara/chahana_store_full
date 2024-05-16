"use client";
import { DataTableColumnHeader } from "@/components/Table/data-table-column-header";
import firstLetterCapital from "@/lib/first-letter-capital";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowUpDown, Slash } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import InvoiceDetailsAction from "./_components/InvoiceDetailsAction";
import TableAmountCell from "./_components/TableAmountCell";
import TableCustomerCell from "./_components/TableCustomerCell";
import TableDueCell from "./_components/TableDueCell";
import TablePaidCell from "./_components/TablePaidCell";

export const VENDOR_INVOICE_PARAM = "/vendor/invoice"; // Manual

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Invoices = InvoiceWithOrderUserAndPayment;

export const columns: ColumnDef<Invoices>[] = [
  {
    accessorKey: "customer",
    header: "Status",
    cell: ({ row }) => {
      return <TableCustomerCell rowDataWhichIsInvoice={row.original} />;
    },
  },
  {
    accessorKey: "order",
    header: "Order",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 items-center">
          <div>#{row.original.order?.id} </div>
          <Slash size={16} />
          <div className="text-muted-foreground w-fit italic">
            {firstLetterCapital(row.original.order?.status!)}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "dueDate",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={"Due Date"}
          urlPathParameterExcludingBaseUrl={VENDOR_INVOICE_PARAM}
        />
      );
    },
    cell: ({ row }) => {
      return <div>{format(row.original.dueDate!, "yyyy MMM dd")}</div>;
    },
  },
  {
    id: "paid",
    header: "Paid",
    cell: ({ row }) => {
      return <TablePaidCell rowDataWhichIsInvoice={row.original} />;
    },
  },
  {
    id: "amount",
    header: "Amount",
    cell: ({ row }) => {
      return <TableAmountCell rowDataWhichIsInvoice={row.original} />;
    },
  },
  {
    id: "due",
    header: "Due Amount",
    cell: ({ row }) => {
      return <TableDueCell rowDataWhichIsInvoice={row.original} />;
    },
  },
  {
    id: "overdue",
    header: ({ column }) => {
      const [isOverdue, setIsOverdue] = useState(true);
      const router = useRouter();
      const searchParams = useSearchParams().toString();

      const handleSortClick = () => {
        setIsOverdue(!isOverdue);
        const params = new URLSearchParams(searchParams);
        // Check if a "sort" parameter already exists in the parameters object
        if (params.has("overdue")) {
          // If it exists, update the value of the "sort" parameter with the new sort criteria (newSort)
          params.set("overdue", isOverdue.toString());
        } else {
          // If "sort" parameter doesn't exist, create a new parameter named "sort" with the value of newSort
          params.append("overdue", isOverdue.toString());
        }

        router.push(`${VENDOR_INVOICE_PARAM}/?${params.toString()}`);
      };
      return (
        <div
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground rounded-md px-3 -ml-3 h-8 data-[state=open]:bg-accent cursor-pointer gap-2"
          onClick={handleSortClick}
        >
          Overdue
          <ArrowUpDown size={12} />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.dueDate &&
            new Date(row.original.dueDate) < new Date() && (
              <div className="text-red-700 bg-red-50 p-1  gap-1 rounded-full text-xs flex items-center justify-center">
                Overdue
              </div>
            )}
        </div>
      );
    },
  },
  {
    id: "preview",
    header: "Preview",
    cell: ({ row }) => {
      return <InvoiceDetailsAction rowDataWhichIsInvoice={row.original} />;
    },
  },
];
