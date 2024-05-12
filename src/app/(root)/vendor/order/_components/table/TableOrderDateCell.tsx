import { OrderWithCustomer } from "@/types";
import { format } from "date-fns";

interface TableOrderDateCellProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}
export default function TableOrderDateCell({
  rowDataWhichIsOrder,
}: TableOrderDateCellProps) {
  return <div>{format(rowDataWhichIsOrder.order_date!, "MMM dd")}</div>;
}
