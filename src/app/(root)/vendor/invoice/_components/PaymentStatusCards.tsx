import { InvoiceWithOrderUserAndPayment } from "@/types";
import {
  calculateRevenueTotal,
  calculateSummary,
} from "../../_utils/revenue-calculation";
import PaymentStatusCardsCard from "./PaymentStatusCardsCard";

interface PaymentStatusCardsProps {
  invoices: InvoiceWithOrderUserAndPayment[];
}

export default function PaymentStatusCards({
  invoices,
}: PaymentStatusCardsProps) {
  // ...
  const totalAmount = invoices.reduce((acc, invoice) => {
    const order_product = invoice.order?.order_product;
    const revenueTotal = calculateRevenueTotal(order_product!);
    const { totalAmount } = calculateSummary(revenueTotal);
    return acc + totalAmount;
  }, 0);

  // ...
  const totalPaid = invoices.reduce((acc, invoice) => {
    // paid accumulated
    const accPaid = invoice.payment.reduce((acc, payment) => {
      if (payment.status === "PENDING" || payment.status === "CANCELED")
        return acc;
      return acc + payment.amount;
    }, 0);
    return acc + accPaid;
  }, 0);
  const totalPaidCount = invoices.filter(
    (invoice) => invoice.payment.length > 0
  ).length;

  // ...
  const totalDueAmount = invoices.reduce((acc, invoice) => {
    // paid accumulated
    const accPaid = invoice.payment.reduce((acc, payment) => {
      if (payment.status === "CANCELED") return acc;
      return acc + payment.amount;
    }, 0);
    const order_product = invoice.order?.order_product;
    const revenueTotal = calculateRevenueTotal(order_product!);
    const { totalAmount } = calculateSummary(revenueTotal);
    const totalDue = totalAmount - accPaid;
    return acc + totalDue;
  }, 0);
  const totalDueCount = invoices.filter((invoice) => {
    const accPaid = invoice.payment.reduce(
      (acc, payment) => acc + payment.amount,
      0
    );
    const order_product = invoice.order?.order_product;
    const revenueTotal = calculateRevenueTotal(order_product!);
    const { totalAmount } = calculateSummary(revenueTotal);
    const totalDue = totalAmount - accPaid;
    return totalDue > 0;
  }).length;

  // ...
  const totalPendingAmount = invoices.reduce((acc, invoice) => {
    const pendingPayments = invoice.payment.filter(
      (payment) => payment.status === "PENDING"
    );
    const pendingAmount = pendingPayments.reduce(
      (acc, invoice) => invoice.amount + acc,
      0
    );
    return acc + pendingAmount;
  }, 0);
  const totalPendingCount = invoices.filter((invoice) => {
    const pendingPayments = invoice.payment.filter(
      (payment) => payment.status === "PENDING"
    );
    return pendingPayments.length > 0;
  }).length;

  //

  const showCards = [
    { type: "total", total: totalAmount, length: invoices.length }, // total
    { type: "paid", total: totalPaid, length: totalPaidCount },
    { type: "pending", total: totalPendingAmount, length: totalPendingCount },
    { type: "due", total: totalDueAmount, length: totalDueCount },
  ];

  return (
    <section className="w-full">
      <div className="flex gap-6 overflow-x-auto p-4 md:px-0">
        {showCards.map((card, i) => (
          <PaymentStatusCardsCard card={card} key={i} />
        ))}
      </div>
    </section>
  );
}
