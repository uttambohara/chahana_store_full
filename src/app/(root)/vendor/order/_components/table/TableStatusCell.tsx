import firstLetterCapital from "@/lib/first-letter-capital";
import { OrderWithCustomer } from "@/types";
import { Check, Clock, Slash, X } from "lucide-react";

interface TableStatusCellProps {
  rowDataWhichIsOrder: OrderWithCustomer; // Rename for clarity
}

const statusColors = {
  PENDING: "orange",
  COMPLETED: "green",
  CANCELED: "red",
  REFUNDED: "red",
};

const statusIcons = {
  PENDING: Clock,
  COMPLETED: Check,
  CANCELED: X,
  REFUNDED: Slash,
};

export default function TableStatusCell({
  rowDataWhichIsOrder,
}: TableStatusCellProps) {
  const color = statusColors[rowDataWhichIsOrder.status];
  const Icon = statusIcons[rowDataWhichIsOrder.status];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-${color}-100 px-2.5 py-0.5 text-xs text-${color}-700 dark:bg-${color}-900 dark:text-${color}-200 font-bold`}
    >
      <Icon size={16} />
      {firstLetterCapital(rowDataWhichIsOrder.status)}
    </span>
  );
}
