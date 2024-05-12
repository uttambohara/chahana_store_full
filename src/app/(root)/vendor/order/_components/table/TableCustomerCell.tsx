import { OrderWithCustomer } from "@/types";
import Image from "next/image";
import React from "react";

interface TableCustomerCellProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}

export default function TableCustomerCell({
  rowDataWhichIsOrder,
}: TableCustomerCellProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="relative h-12 w-12">
        <Image
          src={rowDataWhichIsOrder.customer?.users?.avatar_url || ""}
          alt={
            rowDataWhichIsOrder.customer?.users?.avatar_url || "No image found!"
          }
          fill
          priority
          className="rounded-full object-cover"
        />
      </div>
      <div>
        <div className="font-bold">
          {rowDataWhichIsOrder.customer?.users?.first_name}{" "}
          {rowDataWhichIsOrder.customer?.users?.last_name}
        </div>
        <div className="text-muted-foreground">
          {rowDataWhichIsOrder.customer?.users?.email}
        </div>
      </div>
    </div>
  );
}
