"use client";

import { DataTableColumnHeader } from "@/components/Table/data-table-column-header";
import { OrderWithCustomer } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

import ChangeOrderStatusAction from "./_components/table/ChangeOrderStatusAction";
import TableCustomerCell from "./_components/table/TableCustomerCell";
import TableOrderDateCell from "./_components/table/TableOrderDateCell";

import TableOrderPreview from "./_components/table/TableOrderPreview";
import TableQuantityCell from "./_components/table/TableQuantityCell";
import TableRevenueCell from "./_components/table/TableRevenueCell";
import TableStatusCell from "./_components/table/TableStatusCell";

export const VENDOR_ORDER_PARAM = "/vendor/order"; // Manual

export type Orders = OrderWithCustomer;

export const columns: ColumnDef<Orders>[] = [
  {
    accessorKey: "customer",
    header: "Customer",
    cell: ({ row }) => {
      return <TableCustomerCell rowDataWhichIsOrder={row.original} />;
    },
  },
  {
    accessorKey: "order_date",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={"Order date"}
          urlPathParameterExcludingBaseUrl={VENDOR_ORDER_PARAM}
        />
      );
    },
    cell: ({ row }) => {
      return <TableOrderDateCell rowDataWhichIsOrder={row.original} />;
    },
  },
  {
    id: "quantity",
    header: "Quantity",
    cell: ({ row }) => {
      return <TableQuantityCell rowDataWhichIsOrder={row.original} />;
    },
  },
  {
    id: "total",
    header: "Total revenue",
    cell: ({ row }) => {
      return <TableRevenueCell rowDataWhichIsOrder={row.original} />;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <TableStatusCell rowDataWhichIsOrder={row.original} />;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <TableOrderPreview rowDataWhichIsOrder={row.original} />
          <ChangeOrderStatusAction rowDataWhichIsOrder={row.original} />
        </div>
      );
    },
  },
];
