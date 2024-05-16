import { formatCurrencyToNPR } from "@/lib/format-currency";
import { InvoiceWithOrderUserAndPayment } from "@/types";
import {
  calculateRevenueTotal,
  calculateSummary,
} from "../../_utils/revenue-calculation";

interface TableDueCellInterface {
  rowDataWhichIsInvoice: InvoiceWithOrderUserAndPayment;
}

export default function TableDueCell({
  rowDataWhichIsInvoice,
}: TableDueCellInterface) {
  const order_product = rowDataWhichIsInvoice.order?.order_product;
  const revenueTotal = calculateRevenueTotal(order_product!);
  const { totalAmount } = calculateSummary(revenueTotal);

  const paymentMethod = rowDataWhichIsInvoice.payment?.filter(
    (payment) => payment.customer_id === rowDataWhichIsInvoice.customer_id
  );

  if (!paymentMethod) return null;

  const totalPaid = paymentMethod?.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  return (
    <div> {formatCurrencyToNPR(Number(totalAmount) - Number(totalPaid))}</div>
  );
}
