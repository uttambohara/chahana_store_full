import firstLetterCapital from "@/lib/first-letter-capital";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import { OrderWithCustomer } from "@/types";
import Image from "next/image";
import React from "react";

interface TablePaymentStatusProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}

const paymentMethodImages = {
  CASH: "/cash.jpeg",
  "CASH ON DELIVERY": "/cash_on_delivery.jpg",
  CONNECT_IPS: "/connect-ips.png",
  ESEWA: "/esewa.webp",
  CARD: "/card.jpeg",
  NO_PAYMENT: "/no_payment.jpg",
};

export default function TablePaymentStatus({
  rowDataWhichIsOrder,
}: TablePaymentStatusProps) {
  const paymentMethod = rowDataWhichIsOrder.payment?.filter(
    (payment) => payment.order_id === rowDataWhichIsOrder.id
  );
  if (!paymentMethod) return null;

  const totalPaid = paymentMethod?.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  return (
    <div>
      <div className="space-y-2 text-sm text-muted-foreground py-2">
        {paymentMethod?.map((payment) => {
          //
          return (
            <div
              key={payment.id}
              className="flex items-center gap-2 justify-between"
            >
              <p>{firstLetterCapital(payment.method)}</p>
              <p>{formatCurrencyToNPR(payment.amount)}</p>
            </div>
          );
        })}
      </div>
      <div className="flex p-3">
        <div className="ml-auto">
          Total Paid {formatCurrencyToNPR(totalPaid)}
        </div>
      </div>
    </div>
  );
}
