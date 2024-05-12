// Function to filter invoices based on search parameter

import { InvoiceWithOrderUserAndPayment } from "@/types";
import {
  calculateRevenueTotal,
  calculateSummary,
} from "../../_utils/revenue-calculation";

export function filterInvoicesByStatus(
  invoice: InvoiceWithOrderUserAndPayment[],
  status: string
) {
  return invoice.filter(
    (invoice) => calculatePaymentStatus(invoice) === status.toLowerCase()
  );
}

export function calculatePaymentStatus(
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment
) {
  const order_product = rowDataWhichIsInvoice.order?.order_product;
  const totalRevenue = calculateRevenueTotal(order_product!);
  const { totalAmount } = calculateSummary(totalRevenue);

  const paidAmount = rowDataWhichIsInvoice.payment.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  if (
    rowDataWhichIsInvoice.payment.some(
      (payment) => payment?.status === "CANCELED"
    )
  ) {
    return "canceled";
  } else if (totalAmount > paidAmount!) {
    return "pending";
  } else if (totalAmount === paidAmount) {
    return "paid";
  } else if (
    rowDataWhichIsInvoice.dueDate &&
    new Date(rowDataWhichIsInvoice.dueDate) < new Date()
  ) {
    return "overdue";
  } else {
    return "overpaid";
  }
}
