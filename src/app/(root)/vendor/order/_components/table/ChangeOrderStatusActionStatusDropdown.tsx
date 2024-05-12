import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { ORDER_STATUS } from "@/data/constant";
import { OrderStatusWithoutAll } from "../../_types";

interface ChangeStatusActionStatusDropdownProps {
  handleClick: (role: OrderStatusWithoutAll) => void;
}

export default function ChangeOrderStatusActionStatusDropdown({
  handleClick,
}: ChangeStatusActionStatusDropdownProps) {
  return (
    <>
      {ORDER_STATUS.map((status) => {
        if (status === "ALL") return;
        return (
          <DropdownMenuItem key={status} onClick={() => handleClick(status)}>
            {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
          </DropdownMenuItem>
        );
      })}
    </>
  );
}
