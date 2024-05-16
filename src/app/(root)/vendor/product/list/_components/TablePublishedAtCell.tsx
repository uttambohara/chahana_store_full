import { Tables } from "@/types/supabase";
import { format } from "date-fns";
import { Check } from "lucide-react";

interface TablePublishedAtCellProps {
  rowDataWhichIsProduct: Tables<"product"> & {
    category: Tables<"category"> | null;
  };
}

export default function TablePublishedAtCell({
  rowDataWhichIsProduct,
}: TablePublishedAtCellProps) {
  return (
    <div>
      {rowDataWhichIsProduct.created_at && (
        <div className="text-muted-foreground">
          {format(rowDataWhichIsProduct.created_at, "yyyy MMM dd")}
        </div>
      )}
    </div>
  );
}
