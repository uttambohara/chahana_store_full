import { OrderWithCustomer } from "@/types";
import React from "react";

interface TableQuantityCellProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}

export default function TableQuantityCell({
  rowDataWhichIsOrder,
}: TableQuantityCellProps) {
  const order_product = rowDataWhichIsOrder.order_product;
  const totalOrderedQuantity = order_product.reduce(
    (acc, product) => acc + product.quantity,
    0
  );
  const totalNumberOfProducts = rowDataWhichIsOrder.order_product.length;
  return (
    <div>
      <div className="text-muted-foreground">
        {totalNumberOfProducts}{" "}
        {totalNumberOfProducts > 1 ? "products" : "product"}
      </div>
      <div> {totalOrderedQuantity} units</div>
    </div>
  );
}
