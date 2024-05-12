import { Tables } from "@/types/supabase";
import Image from "next/image";

interface TableNameColumnProps {
  rowDataWhichIsProduct: Tables<"product"> & {
    category: Tables<"category"> | null;
  };
}

export default function TableNameColumn({
  rowDataWhichIsProduct,
}: TableNameColumnProps) {
  const img = JSON.parse(rowDataWhichIsProduct.productImgs);
  const firstImg = img[0];
  return (
    <div className="flex items-center gap-3">
      <div className="h-12 w-12 relative shrink-0">
        <Image
          src={firstImg.image}
          alt={firstImg.name}
          fill
          priority
          className="object-cover rounded-full"
        />
      </div>
      <div>
        <h3> {rowDataWhichIsProduct.name}</h3>
        <p className="text-muted-foreground">
          in {rowDataWhichIsProduct.category?.name}
        </p>
      </div>
    </div>
  );
}
