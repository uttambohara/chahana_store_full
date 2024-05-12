import { formatCurrencyToNPR } from "@/lib/format-currency";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import React from "react";
import {
  calculateRevenueTotal,
  calculateSummary,
} from "../../_utils/revenue-calculation";

interface TableAmountCellInterface {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TableAmountCell({
  rowDataWhichIsInvoice,
}: TableAmountCellInterface) {
  const order_product = rowDataWhichIsInvoice.order?.order_product;

  const revenueTotal = calculateRevenueTotal(order_product!);
  const { totalAmount } = calculateSummary(revenueTotal);

  return <div>{formatCurrencyToNPR(totalAmount!)}</div>;
}
