import { ORDER_STATUS } from "@/constant";
import firstLetterCapital from "@/lib/first-letter-capital";
import { OrderWithCustomer } from "@/types";
import clsx from "clsx";

interface OrderStatusCardProps {
  orders: OrderWithCustomer[];
}

export default function OrderStatusCard({ orders }: OrderStatusCardProps) {
  const pending = orders.filter((order) => order.status === "PENDING");
  const completed = orders.filter((order) => order.status === "COMPLETED");
  const canceled = orders.filter((order) => order.status === "CANCELED");
  const refunded = orders.filter((order) => order.status === "REFUNDED");

  const allStatus = { pending, completed, canceled, refunded };

  return (
    <div className="flex items-center gap-2">
      {ORDER_STATUS.map((status, index) => (
        <div key={status} className="flex items-center gap-2">
          <div>{firstLetterCapital(status)}</div>
          <div
            className={clsx(
              "size-8 rounded-full flex items-center justify-center",
              {
                "bg-orange-50 text-orange-700": status === "PENDING",
                "bg-green-50 text-green-700": status === "COMPLETED",
                "bg-red-50 text-red-700": status === "CANCELED",
                "bg-gray-50 text-gray-700": status === "REFUNDED",
              }
            )}
          >
            {allStatus[status.toLowerCase() as keyof typeof allStatus].length}
          </div>

          {index < ORDER_STATUS.length - 1 && <div>|</div>}
        </div>
      ))}
    </div>
  );
}
