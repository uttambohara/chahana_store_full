import { deleteTableBy } from "@/actions/supabase/supabaseDatabase";
import CustomModal from "@/components/Global/CustomModal";
import LoaderEl from "@/components/Global/LoaderEl";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useModal } from "@/providers/modal-provider";
import { TProductWithCategorySubColorAndSizes } from "@/types";
import { Eye, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import ProductCard from "../../list/_components/ProductDisplayCard";
import { VENDOR_PARAM_WITH_UPDATE } from "../../list/columns";

export const TableProductAction = ({
  rowDataWhichIsProduct,
}: {
  rowDataWhichIsProduct: TProductWithCategorySubColorAndSizes;
}) => {
  const [isPending, startTranstion] = useTransition();
  const { setOpen, setClose } = useModal();
  const router = useRouter();

  function handleProductDeleteFirstPhaseDisplayModal() {
    setOpen(
      <CustomModal title={"Are you absolutely sure?"}>
        <p>
          This action cannot be undone. This will permanently delete your
          account and remove your data from our servers.
        </p>
        {/*  */}
        <div className="flex">
          <div className="ml-auto mt-3 flex items-center gap-2">
            <Button variant="outline" onClick={setClose}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleProductDelete}
              disabled={isPending}
            >
              {isPending && <LoaderEl />}
              Continue
            </Button>
          </div>
        </div>
      </CustomModal>
    );
  }

  function handleProductDelete() {
    startTranstion(async () => {
      await deleteTableBy("product", "id", rowDataWhichIsProduct.id);
      toast.success("Product deleted");
      router.refresh();
    });
    setClose();
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        size={"sm"}
        variant={"ghost"}
        onClick={() => {
          setOpen(
            <CustomModal title={"Product Card"} className="w-[30rem]">
              <ProductCard rowDataWhichIsProduct={rowDataWhichIsProduct} />
            </CustomModal>
          );
        }}
      >
        <Eye />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={handleProductDeleteFirstPhaseDisplayModal}>
            Delete
          </DropdownMenuItem>
          <Link
            href={`${VENDOR_PARAM_WITH_UPDATE}/${rowDataWhichIsProduct.id}`}
          >
            <DropdownMenuItem>Update</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
