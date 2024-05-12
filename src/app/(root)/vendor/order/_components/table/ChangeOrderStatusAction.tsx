import { updateOrderStatusByOrderId } from "@/actions/supabase/supabaseDatabase";
import LoaderEl from "@/components/Global/LoaderEl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { OrderWithCustomer } from "@/types";
import { ChevronDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import ChangeOrderStatusActionStatusDropdown from "./ChangeOrderStatusActionStatusDropdown";
import { OrderStatusWithoutAll } from "../../_types";

interface ChangeOrderStatusActionProps {
  rowDataWhichIsOrder: OrderWithCustomer;
}

export default function ChangeOrderStatusAction({
  rowDataWhichIsOrder,
}: ChangeOrderStatusActionProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  async function handleRoleChange(role: OrderStatusWithoutAll) {
    startTransition(async () => {
      const response = await updateOrderStatusByOrderId(
        rowDataWhichIsOrder.id,
        role
      );
      router.refresh();
    });
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-6 w-6 p-0">
          <span className="sr-only">Open menu</span>
          {isPending ? <LoaderEl /> : <ChevronDown />}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Change status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ChangeOrderStatusActionStatusDropdown
          handleClick={function (status) {
            handleRoleChange(status);
          }}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
