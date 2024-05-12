"use client";
import { DataTableColumnHeader } from "@/components/Table/data-table-column-header";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import InvoiceDetailsAction from "./_components/InvoiceDetailsAction";
import TableAmountCell from "./_components/TableAmountCell";
import TableCustomerCell from "./_components/TableCustomerCell";
import TableDueCell from "./_components/TableDueCell";
import TableInvoiceCreatedAtCell from "./_components/TableInvoiceCreatedAtCell";
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
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={"Created At"}
          urlPathParameterExcludingBaseUrl={VENDOR_INVOICE_PARAM}
        />
      );
    },
    cell: ({ row }) => {
      return <TableInvoiceCreatedAtCell rowDataWhichIsInvoice={row.original} />;
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
    id: "preview",
    header: "Preview",
    cell: ({ row }) => {
      return <InvoiceDetailsAction rowDataWhichIsInvoice={row.original} />;
    },
  },
];
