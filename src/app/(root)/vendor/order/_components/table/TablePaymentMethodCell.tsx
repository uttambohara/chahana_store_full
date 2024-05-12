import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import firstLetterCapital from "@/lib/first-letter-capital";
import { formatCurrencyToNPR } from "@/lib/format-currency";
import { OrderWithCustomer } from "@/types";
import { Mouse } from "lucide-react";
import Image from "next/image";

interface TablePaymentMethodCellProps {
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

export default function TablePaymentMethodCell({
  rowDataWhichIsOrder,
}: TablePaymentMethodCellProps) {
  //
  const paymentMethod = rowDataWhichIsOrder.payment?.filter(
    (payment) => payment.order_id === rowDataWhichIsOrder.id
  );
  if (!paymentMethod) return null;

  const totalPaid = paymentMethod?.reduce(
    (acc, payment) => acc + payment.amount,
    0
  );

  return (
    <HoverCard>
      <HoverCardTrigger className="cursor-pointer">
        <Mouse size={16} />
      </HoverCardTrigger>
      <HoverCardContent className="w-[20rem]">
        <div>
          <h2 className="text-xl underline underline-offset-8 mb-2">
            @Payments
          </h2>
          <div className="p-3 space-y-2">
            {paymentMethod?.map((payment) => {
              //
              const paymentMethod = payment.method;
              const imgSrc =
                paymentMethodImages[
                  payment.method as keyof typeof paymentMethodImages
                ];

              return (
                <div
                  key={payment.id}
                  className="flex items-center gap-2 justify-between"
                >
                  <div className="h-12 w-12 relative">
                    <Image
                      src={imgSrc}
                      alt={paymentMethod}
                      fill
                      priority
                      className="object-cover rounded-full"
                    />
                  </div>
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
      </HoverCardContent>
    </HoverCard>
  );
}
