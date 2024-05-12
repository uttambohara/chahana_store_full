import { formatCurrencyToNPR } from "@/lib/format-currency";
import { OrderWithCustomer } from "@/types";
import { Mouse } from "lucide-react";
import React from "react";
import TablePaymentMethodCell from "./TablePaymentMethodCell";

interface TableRevenueCellProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}

export default function TableRevenueCell({
  rowDataWhichIsOrder,
}: TableRevenueCellProps) {
  const order_product = rowDataWhichIsOrder.order_product;

  const totalRevenue = order_product.reduce((acc, order_product_item) => {
    const totalPrice =
      order_product_item.quantity! * order_product_item.product?.salesPrice!;
    const discountPercent = order_product_item.product?.discount! / 100;
    //
    const totalPriceAfterDiscountsAdj =
      totalPrice - discountPercent * totalPrice;
    return acc + totalPriceAfterDiscountsAdj;
  }, 0);

  return (
    <div className="flex items-center gap-2">
      <div>
        {formatCurrencyToNPR(totalRevenue)}{" "}
        <div className="text-muted-foreground">inc discount</div>
      </div>
    </div>
  );
}
