"use client";

import { DataTableColumnHeader } from "@/components/Table/data-table-column-header";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import { Tables } from "@/types/supabase";
import { ColumnDef } from "@tanstack/react-table";
import { Check } from "lucide-react";
import TableNameColumn from "../_components/table/TableNameColumn";
import { TableProductAction } from "../_components/table/TableProductAction";
import TablePublishedAtCell from "./_components/TablePublishedAtCell";

const PARAM = "/vendor/product";
export const VENDOR_PARAM_WITH_LIST = "/vendor/product/list"; // Manual
export const VENDOR_PARAM_WITH_UPDATE = "/vendor/product/update"; // Manual

export type Product =
  | Tables<"product"> & {
      category: Tables<"category"> | null;
    };

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={"Name"}
          urlPathParameterExcludingBaseUrl={VENDOR_PARAM_WITH_LIST}
        />
      );
    },
    cell: ({ row }) => {
      return <TableNameColumn rowDataWhichIsProduct={row.original} />;
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => {
      return (
        <DataTableColumnHeader
          column={column}
          title={"Quantity"}
          urlPathParameterExcludingBaseUrl={VENDOR_PARAM_WITH_LIST}
        />
      );
    },
  },
  {
    accessorKey: "salesPrice",
    header: "Price",
    cell: ({ row }) => {
      return <div>{formatCurrencyToNPR(row.original.salesPrice)}</div>;
    },
  },
  {
    accessorKey: "created_at",
    header: "Published at",
    cell: ({ row }) => {
      return <TablePublishedAtCell rowDataWhichIsProduct={row.original} />;
    },
  },
  // {
  //   id: "published_by",
  //   header: "Published by",
  //   cell: ({ row }) => {
  //     const rowDataWhichIsProduct = row.original;
  //     return <div>{rowDataWhichIsProduct.user_id}</div>;
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => <TableProductAction row={row} />,
  },
];
