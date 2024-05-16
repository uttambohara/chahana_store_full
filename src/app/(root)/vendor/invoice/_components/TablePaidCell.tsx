import { formatCurrencyToNPR } from "@/lib/format-currency";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import React from "react";

interface TablePaidCellInterface {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TablePaidCell({
  rowDataWhichIsInvoice,
}: TablePaidCellInterface) {
  return (
    <div>
      {formatCurrencyToNPR(
        rowDataWhichIsInvoice.payment.reduce((sum, payment) => {
          return sum + payment.amount;
        }, 0)
      )}
    </div>
  );
}
