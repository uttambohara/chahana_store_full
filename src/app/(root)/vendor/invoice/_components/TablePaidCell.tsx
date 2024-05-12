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
          if (payment?.status !== "CANCELED") {
            return sum + payment?.amount!;
          }
          return sum;
        }, 0)
      )}
    </div>
  );
}
