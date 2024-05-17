import { formatCurrencyToNPR } from "@/lib/format-currency";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import React from "react";

interface TablePaidCellInterface {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TablePaidCell({
  rowDataWhichIsInvoice,
}: TablePaidCellInterface) {
  const totalPaidAmount = rowDataWhichIsInvoice.payment.reduce(
    (sum, payment) => {
      return sum + payment.amount;
    },
    0
  );

  // Payment canceled
  const canceledPaymentFromBank = rowDataWhichIsInvoice.payment.filter(
    (payment) => payment.status === "CANCELED"
  );
  const totalCanceledAmount = canceledPaymentFromBank.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  return (
    <div>{formatCurrencyToNPR(totalPaidAmount - totalCanceledAmount)}</div>
  );
}
